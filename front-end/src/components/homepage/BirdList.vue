<template>
    <div class="bird-list">
      <BirdCard
        v-for="bird in birds"
        :key="bird.id"
        :bird="bird"
      />
    </div>
  </template>
  
  <script>
  import BirdCard from './BirdCard.vue';
  export default {
    name: 'BirdList',
    components: {
      BirdCard
    },
    props: {
      birds: {
        type: Array,
        required: false,
        default: () => [
  {
    id: 1,
    name: 'Parrot',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Cockatielmale.jpg/300px-Cockatielmale.jpg',
    species: 'Psittaciformes',
    age: 2,
    price: 50,
    description: 'A beautiful green parrot.',
    descriptionSnippet: 'A vibrant green parrot, perfect for families.'
  },
  {
    id: 2,
    name: 'Canary',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Cockatielmale.jpg/300px-Cockatielmale.jpg',
    species: 'Serinus canaria',
    age: 1,
    price: 30,
    description: 'A bright yellow canary with a cheerful song.',
    descriptionSnippet: 'A bright and cheerful yellow canary.'
  }
]
      }
    }
  }
  </script>
  
  <style scoped>
  .bird-list {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: center;
  }
  </style>
  