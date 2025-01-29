<template>
  <v-app-bar style="background-color: #246f27; color: white;">
    <v-toolbar-title class="font-weight-bold">Birb Nation</v-toolbar-title>
    <v-btn v-for="(element, index) in menuItems" :key="index" :to="element.route"
      :style="currentRoute === element.route ? 'color: lime;' : ''" @click="navigate(element.route)">
      {{ element.label }}
    </v-btn>
    <v-btn v-if="isAdmin"
      :to="'/addBird'"
      :style="currentRoute === '/addBird' ? 'color: lime;' : ''" @click="navigate('/addBird')">
      Adauga Pasare
    </v-btn>
    <v-btn :to="'/profile'" :style="currentRoute === '/profile' ? 'color: lime;' : ''" @click="navigate('/profile')">
      <v-avatar size="36" class="ml-4" style="margin-right: 15px;" @click="navigate('/profile')">
        <img src="https://randomuser.me/api/portraits/men/73.jpg" />
      </v-avatar>
      Profil
    </v-btn>

  </v-app-bar>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      menuItems: [
        { label: 'Cumpara', route: '/homepage' },
      ],
      isAdmin: false
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
    async setIsAdmin() {
      try {
        const response = await axios.get(`${process.env.VUE_APP_BACK_END_HOST}/api/users/checkAdminStatus/${this.$store.state.userId}`);
        //console.log(response);
        if (response.status === 200) {
         this.isAdmin = response.data;
        } else {
          console.error("Failed to fetch user:", response.status);
        }
      } catch (error) {
        console.error("Error while fetching user:", error);
      }
    },
  },
  created(){
    this.setIsAdmin();
  },
};
</script>

<style>
html {
  overflow-y: auto
}
</style>