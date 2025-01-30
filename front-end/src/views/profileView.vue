<template>
    <div id="main-container" class="beautiful-colors">
        <HeaderComponent />
        <UserData />
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
        };
    },
    async created() {
        const userId = this.$store.state.userId;
        if (!userId) return;

        try {
            const response = await axios.get(`${process.env.VUE_APP_BACK_END_HOST}/api/users/checkAdminStatus/${userId}`);
            this.isAdmin = response.data;
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
    background: linear-gradient(142deg, rgba(23, 173, 162, 1) 0%, rgba(201, 102, 95, 1) 34%, rgba(200, 218, 49, 1) 66%, rgba(74, 255, 0, 1) 100%);
}
</style>
