<template>
    <v-card v-if="bird" class="bird-card">
      <v-card class="left-section">
        <v-img :src="bird.photo" />
        <v-card-title>{{ bird.name }}</v-card-title>
      </v-card>
  
      <v-card-text class="right-section">
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <strong>Species:</strong> {{ bird.species }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <strong>Age:</strong> {{ bird.age }} years
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <strong>Price:</strong> ${{ bird.price }}
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider class="my-4"></v-divider>
        <p>{{ bird.description }}</p>
  
        <div class="button-container">
          <v-btn color="primary" @click="buyBird">Buy Bird</v-btn>
        </div>
      </v-card-text>
    </v-card>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    props: {
      bird: Object,
    },
    methods: {
      async buyBird() {
        console.log(`You bought the bird: ${this.bird.name}`);
        const res1 = await axios.put(`${process.env.VUE_APP_BACK_END_HOST}/api/birds/updateBirdBuyStateById/${this.$route.params.id}`,{
          userId : this.$store.state.userId
        })
        console.log(res1);
        const res2 = await axios.put(`${process.env.VUE_APP_BACK_END_HOST}/api/users/reserveBirdForUser`,{
          userId:this.$store.state.userId,
          birdId:this.$route.params.id,
        })
        console.log(res2);
      },
    },
  };
  </script>
  
  <style scoped>
  .bird-card {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 20px auto;
    max-width: 70%;
    border-radius: 12px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    background-color: white;
  }
  
  .left-section {
    flex: 1;
    text-align: center;
    margin-right: 15px;
  }
  
  .right-section {
    flex: 2;
    text-align: left;
  }
  
  .button-container {
    text-align: right;
    margin-top: 20px;
  }
  </style>
  