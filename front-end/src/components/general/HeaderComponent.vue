<template>
  <v-app-bar style="background-color: #058E3F; color: white;">
    <v-app-bar-nav-icon class="d-md-none" @click="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title class="font-weight-bold">Birb Nation</v-toolbar-title>

    <v-spacer></v-spacer>

    <div class="d-none d-md-flex">
      <v-btn v-for="(element, index) in menuItems" :key="index" :to="element.route"
        :style="currentRoute === element.route ? 'color: lime;' : ''" @click="navigate(element.route)">
        {{ element.label }}
      </v-btn>
      <v-btn v-if="isAdmin" :to="'/addBird'" :style="currentRoute === '/addBird' ? 'color: lime;' : ''"
        @click="navigate('/addBird')">
        Adauga Pasare
      </v-btn>
      <v-btn :to="'/profile'" :style="currentRoute === '/profile' ? 'color: lime;' : ''" @click="navigate('/profile')">
        <v-avatar size="36" class="ml-4" style="margin-right: 15px;">
          <v-img 
              :src="user.profilePicture ? user.profilePicture : 'https://myrightbird.com/assets/uploads/mybird_sun_conure_on_perch.jpg'"
            ></v-img>
        </v-avatar>
        Profil
      </v-btn>
      <v-btn @click="logout()">Logout</v-btn>
    </div>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" app class="d-md-none">
    <v-list>
      <v-list-item v-for="(element, index) in menuItems" :key="index" @click="navigate(element.route)">
        <v-list-item-title>{{ element.label }}</v-list-item-title>
      </v-list-item>
      <v-list-item v-if="isAdmin" @click="navigate('/addBird')">
        <v-list-item-title>Add Bird</v-list-item-title>
      </v-list-item>
      <v-list-item @click="navigate('/profile')">
        <v-list-item-title>Profile</v-list-item-title>
      </v-list-item>
      <v-list-item @click="logout()">
        <v-list-item-title>Logout</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      drawer: false,
      menuItems: [
        { label: 'Buy', route: '/homepage' },
      ],
      isAdmin: false,
      user: {
        type: Object,
        required: true,
      },
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
      this.drawer = false;
    },
    async logout() {
      try {
        await axios.get(`${process.env.VUE_APP_BACK_END_HOST}/api/users/logoutUser`);
        this.$store.commit('setToken', null);
        this.$store.commit('setUserId', null);
        sessionStorage.clear();
        this.$router.push('/');
        this.drawer = false;
      } catch (error) {
        console.log({ message: error });
      }

    },
    async setIsAdmin() {
      if (!this.$store.state.userId) {
        this.isAdmin = false;
        return;
      }
      try {
        const response = await axios.get(`${process.env.VUE_APP_BACK_END_HOST}/api/users/getUserById/${this.$store.state.userId}`);
        if (response.status === 200) {
          this.isAdmin = response.data.isAdmin;
          this.user = response.data;
        } else {
          console.error("Failed to fetch user:", response.status);
        }
      } catch (error) {
        console.error("Error while fetching user:", error);
      }
    },
  },
  created() {
    this.setIsAdmin();
  },
};
</script>

<style>
html {
  overflow-y: auto;
}
</style>
