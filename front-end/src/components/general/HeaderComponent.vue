<template>
    <v-app-bar style="background-color: #246f27; color: white;">
      <v-toolbar-title class="font-weight-bold">Birb Nation</v-toolbar-title>
      <v-btn
        v-for="(element, index) in menuItems"
        :key="index"
        :to="element.route"
        :style="currentRoute === element.route ? 'color: lime;' : ''"
        @click="navigate(element.route)"
      >
        {{ element.label }}
      </v-btn>
      <v-btn
      :to="'/profile'"
      :style="currentRoute === '/profile' ? 'color: lime;' : ''"
      @click="navigate('/profile')"
      >
        <v-avatar size="36" class="ml-4" style="margin-right: 15px;" @click="navigate('/profile')">
        <img src="https://randomuser.me/api/portraits/men/73.jpg" />
      </v-avatar>
      Profil
      </v-btn>
      
    </v-app-bar>
  </template>
  

  <script>
  export default {
    data() {
      return {
        menuItems: [
          { label: 'Adoptă', route: '/homepage' },
          { label: 'Dă spre adopție', route: '/giveAdopt' },
        ],
      };
    },
    computed: {
      currentRoute() {
        return this.$route.path;
      },
    },
    methods: {
      navigate(route) {
        this.$router.push(route);
      },
    },
  };
  </script>

<style>
html {
     overflow-y: auto
}
</style>