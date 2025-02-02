<template>
    <div id="main-container" class="beautiful-colors">
        <HeaderComponent />
        <EditBird />
    </div>


</template>

<script>
import HeaderComponent from '../components/general/HeaderComponent.vue';
import EditBird from '@/components/birdForms/EditBird.vue';
export default {
    components: {
        HeaderComponent,
        EditBird,
    },
    methods: {
        isLoggedInAdmin() {
            if (this.$store.state.token === null) {
                this.$router.push('/')
            }
            else if (!this.$store.state.isAdmin) {
                this.$router.push('/homepage');
            }
        },
    },
    mounted(){
        this.isLoggedInAdmin();
    }
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