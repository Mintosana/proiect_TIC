<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2 class="text-center" style="color:white">{{ favouriteBirdArray.length ? "Favourite Birds" : "No Favourite Birds yet..." }}</h2>
      </v-col>
    </v-row>

    <v-row>
      <v-col v-for="bird in favouriteBirdArray" :key="bird.id" cols="12" sm="6" md="4" lg="3">
        <router-link :to="`/bird/${bird.id}`" class="text-decoration-none">
          <v-card class="mx-auto" max-width="350" min-height="500" elevation="4">
            <img class="bird-image" :src="bird.photo" alt="Bird Image">
            <v-card-title>{{ bird.name }}</v-card-title>
            <v-card-subtitle>{{ bird.species }}</v-card-subtitle>
            <v-card-text>
              <p><strong>Age:</strong> {{ bird.age }} years</p>
              <p><strong>Price:</strong> ${{ bird.price }}</p>
              <br>
              <p class="bird-description">{{ bird.description }}</p>
            </v-card-text>
          </v-card>
        </router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  name: "BirdList",
  data() {
    return {
      birds: [],
      favouriteBirdArray: [],
    };
  },
  methods: {
    async getFavouriteBirds() {
      try {
        const response = await axios.get(`${process.env.VUE_APP_BACK_END_HOST}/api/users/getFavouriteBirds/${this.$store.state.userId}`);
        this.favouriteBirdArray = response.data.favouriteBirds;
      } catch (error) {
        console.log(`Error getting favourite birds for user: ${error}`)
      }

    },
  },
  mounted() {
    this.getFavouriteBirds();
  }
};
</script>

<style scoped>
.bird-description {
  max-height: 4rem;
  overflow-y: scroll;
}

.bird-image {
  width: 100%;
  height: 17rem;
  object-fit: cover;
  object-position: top;
  display: block;
}
</style>