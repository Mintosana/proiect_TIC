<template>
  <div id="main-container" class="beautiful-colors">
    <HeaderComponent />
    <BirdList :birds="birdsForSale" />
  </div>


</template>

<script>
import BirdList from '@/components/homepage/BirdList.vue';
import HeaderComponent from '../components/general/HeaderComponent.vue';
import axios from 'axios';

export default {
  components: {
    HeaderComponent,
    BirdList,
  },
  data() {
    return {
      birdsForSale: []
    }
  },
  methods: {
    async fetchBirds() {
      try {
        const response = await axios.get(`${process.env.VUE_APP_BACK_END_HOST}/api/birds/getBirdsWithAvailableBuyState`);
        this.birdsForSale = response.data;
      } catch (error) {
        console.error('Error fetching birds:', error);
      }
    },
    isLoggedIn(){
      if(this.$store.state.token === null){
        this.$router.push('/');
      }
    },
  },
  mounted() {
    this.fetchBirds();
    this.isLoggedIn();
  },
};
</script>

<style>
#main-container {
  min-height: 100vh;
}

.beautiful-colors {
    background: #03440C;
}
</style>