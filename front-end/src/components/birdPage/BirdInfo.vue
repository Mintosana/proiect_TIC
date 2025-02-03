<template>
  <v-card v-if="bird" class="bird-card">
    <v-card class="left-section">
      <v-img :src="bird.photo" />
      <v-card-title>{{ bird.name }}</v-card-title>
    </v-card>
    <BirdDetails :bird="bird" />
    <div class="buttons-section">
      <v-btn v-if="isAdmin" color="warning" class="mr-2" @click="editBird">Edit</v-btn>
      <v-btn v-if="isAdmin" color="red" @click="openDeleteDialog">Delete</v-btn>
      <v-btn v-if="!isAdmin" color="primary" @click="buyBird">Reserve</v-btn>
      <v-btn v-if="!isAdmin" color="primary" @click="toggleFavorite">
        <v-icon color="yellow darken-2">
          {{ isFavorited ? "mdi-star" : "mdi-star-outline" }}
        </v-icon>
      </v-btn>
    </div>
  </v-card>

  <v-dialog v-model="showDeleteDialog" max-width="400">
    <v-card>
      <v-card-title>Are you sure?</v-card-title>
      <v-card-text>Do you really want to delete this bird?</v-card-text>
      <v-card-actions>
        <v-btn color="gray" @click="showDeleteDialog = false">No</v-btn>
        <v-btn color="red" @click="deleteBird">Yes</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
import BirdDetails from "./BirdDetails.vue";

export default {
  components: {
    BirdDetails,
  },
  props: {
    bird: Object,
  },
  data() {
    return {
      isAdmin: false,
      showDeleteDialog: false,
      isFavorited: false,
    };
  },
  methods: {
    async checkAdminStatus() {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_BACK_END_HOST}/api/users/checkAdminStatus/${this.$store.state.userId}`
        );
        this.isAdmin = response.data === 1;
      } catch (error) {
        console.error("Error checking admin status:", error);
      }
    },
    async buyBird() {
      try {
        await axios.put(
          `${process.env.VUE_APP_BACK_END_HOST}/api/birds/updateBirdBuyStateById/${this.$route.params.id}`,
          { userId: this.$store.state.userId }
        );
        console.log(`Waiting for approval from admin for bird: ${this.bird.name}`);

        await axios.put(`${process.env.VUE_APP_BACK_END_HOST}/api/users/reserveBirdForUser`, {
          userId: this.$store.state.userId,
          birdId: this.$route.params.id,
        });
      } catch (error) {
        console.error("Error buying bird:", error);
      }
    },
    async toggleFavorite() {
      try {
        const response = await axios.post(`${process.env.VUE_APP_BACK_END_HOST}/api/users/addBirdToFavourites`, {
          userId: this.$store.state.userId,
          birdId: this.$route.params.id,
        });
        this.isFavorited = response.data.favouriteBirds.includes(this.bird.id);
      } catch (error) {
        console.error("Error checking favorites:", error);
      }
    },
    async checkIfFavorite(){
      try{
        const response = await axios.post(`${process.env.VUE_APP_BACK_END_HOST}/api/users/verifyBirdIsFavourite`, {
          userId: this.$store.state.userId,
          birdId: this.$route.params.id,
        });
        this.isFavorited = response.data.isFavourite;
      }catch(error){
        console.error("Error checking favorites:", error);
      }
      
    },
    editBird() {
      this.$router.push(`/editBird/${this.bird.id}`);
    },
    openDeleteDialog() {
      this.showDeleteDialog = true;
    },
    async deleteBird() {
      try {
        await axios.delete(`${process.env.VUE_APP_BACK_END_HOST}/api/birds/deleteBirdById/${this.$route.params.id}`);
        this.showDeleteDialog = false;
        this.$router.push('/homepage');
      } catch (error) {
        console.log(error);
      }

    },
  },
  created() {
    this.checkAdminStatus();
    this.checkIfFavorite();
  },
};
</script>

<style>
.bird-card {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 20px auto;
  max-width: 70%;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background-color: white;
  position: relative;
}

.left-section {
  flex: 1;
  text-align: center;
  margin-right: 15px;
  margin: 0;
}

.buttons-section {
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
  gap: 10px;
}

@media only screen and (max-width: 1000px) {
  .bird-card {
    flex-direction: column;
  }
}
</style>
