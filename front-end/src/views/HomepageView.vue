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
        const response = await axios.get(`${process.env.VUE_APP_BACK_END_HOST}/api/birds/getAllBirds`);
        this.birdsForSale = response.data;
      } catch (error) {
        console.error('Error fetching birds:', error);
      }
    },
  },
  created() {
    this.fetchBirds();
  },
};
</script>

<style>
#main-container {
  min-height: 100vh;
}

.beautiful-colors {
  background: rgb(23, 173, 162);
  background: linear-gradient(142deg, rgba(23, 173, 162, 1) 0%, rgba(201, 102, 95, 1) 34%, rgba(200, 218, 49, 1) 66%, rgba(74, 255, 0, 1) 100%);
}
</style>