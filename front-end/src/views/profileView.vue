<template>
    <div id="main-container" class="beautiful-colors">
        <HeaderComponent />
        <UserData :user="user" />
        <div v-if="isAdmin !== null">
            <AdminBirdList v-if="isAdmin" />
            <BirdList v-else />
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import HeaderComponent from '../components/general/HeaderComponent.vue';
import UserData from '@/components/profile/UserData.vue';
import BirdList from '@/components/profile/BirdList.vue';
import AdminBirdList from '@/components/profile/AdminBirdList.vue';

export default {
    components: {
        HeaderComponent,
        UserData,
        BirdList,
        AdminBirdList,
    },
    data() {
        return {
            isAdmin: null,
            user: {},
        };
    },
    methods: {
        isLoggedIn(){
            if (this.$store.state.token === null) {
                this.$router.push('/');
            }
        },

    },
    async created() {
        this.isLoggedIn();
        
        const userId = this.$store.state.userId;
        if (!userId) return;

        try {
            const response = await axios.get(`${process.env.VUE_APP_BACK_END_HOST}/api/users/getUserById/${userId}`);
            this.isAdmin = response.data.isAdmin;
            this.user = response.data;
        } catch (error) {
            console.error("Error fetching admin status:", error);
        }
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
