<template>
   <v-row style="height: 7rem; width: 70%; background-color: grey">
   <v-col class="d-flex align-center">
      <img src="https://previews.123rf.com/images/victoroancea/victoroancea1201/victoroancea120100059/12055848-tv-color-test-pattern-test-card-for-pal-and-ntsc.jpg"  height="30" width="30"/>
   </v-col>

   <v-col class="d-flex flex-column justify-center" style="height: 100%; width: 90%; background: :#cecece">
      <div class="name">Prod Name</div>
      <div class="color">Blue</div>
   </v-col> 

   <v-col align-self="center">
       $40
   </v-col>
</v-row>
</template>
  
  <script>
  export default {
    data() {
      return {
        birds: [
          { name: 'Robin', age: 2, species: 'Eurasian Robin', price: '$10' },
          { name: 'Parrot', age: 4, species: 'Macaw', price: '$200' },
          { name: 'Canary', age: 1, species: 'Yellow Canary', price: '$15' },
          { name: 'Eagle', age: 5, species: 'Bald Eagle', price: '$1500' },
        ],
      };
    },
  };
  </script>
  
  <style>
  
  </style>
  