<template>
  <v-container>
    <v-row justify="center" dense class="bird-list-row">
      <v-col 
        v-for="bird in birds" 
        :key="bird.id" 
        cols="12" sm="6" md="4" lg="3"
      >
        <BirdCard :bird="bird" />
      </v-col>
    </v-row>
  </v-container>
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
      required: true
    }
  }
}
</script>
