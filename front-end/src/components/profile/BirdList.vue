<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h2 class="text-center">Favourite Birds</h2>
        </v-col>
      </v-row>
  
      <v-row>
        <v-col v-for="bird in birds" :key="bird.id" cols="12" sm="6" md="4" lg="3">
          <router-link :to="`/bird/${bird.id}`" class="text-decoration-none">
            <v-card class="mx-auto" max-width="350" elevation="4">
              <v-img :src="bird.photo" height="17rem" cover></v-img>
              <v-card-title>{{ bird.name }}</v-card-title>
              <v-card-subtitle>{{ bird.species }}</v-card-subtitle>
              <v-card-text>
                <p><strong>Age:</strong> {{ bird.age }} years</p>
                <p><strong>Price:</strong> ${{ bird.price }}</p>
                <p>{{ bird.description }}</p>
              </v-card-text>
            </v-card>
          </router-link>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    name: "BirdList",
    data() {
      return {
        birds: [
          {
            id: 1,
            name: "Parrot",
            species: "Psittaciformes",
            age: 2,
            price: 50,
            photo: "https://i.pinimg.com/474x/d0/d2/36/d0d236718ee188ca9c3c8999504d2250.jpg",
            description: "A colorful and intelligent bird.",
          },
          {
            id: 2,
            name: "Canary",
            species: "Serinus canaria",
            age: 1,
            price: 30,
            photo: "https://i.pinimg.com/474x/d0/d2/36/d0d236718ee188ca9c3c8999504d2250.jpg",
            description: "A small songbird known for its beautiful voice.",
          },
          {
            id: 3,
            name: "Finch",
            species: "Fringillidae",
            age: 3,
            price: 20,
            photo: "https://i.pinimg.com/474x/d0/d2/36/d0d236718ee188ca9c3c8999504d2250.jpg",
            description: "A lively little bird perfect for beginners.",
          },
          {
            id: 4,
            name: "Sparrow",
            species: "Passeridae",
            age: 2,
            price: 15,
            photo: "https://i.pinimg.com/474x/d0/d2/36/d0d236718ee188ca9c3c8999504d2250.jpg",
            description: "A small but energetic bird.",
          },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .text-truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  </style>
  