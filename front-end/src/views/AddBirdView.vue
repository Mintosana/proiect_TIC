<template>
    <div id="main-container" class="beautiful-colors">
        <HeaderComponent />
        <AddBird />
    </div>


</template>

<script>
import HeaderComponent from '../components/general/HeaderComponent.vue';
import AddBird from '@/components/birdForms/AddBird.vue';
export default {
    components: {
        HeaderComponent,
        AddBird,
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
        console.log(this.$store.state.isAdmin)
        this.isLoggedInAdmin();
    }
};

</script>

<style>
#main-container {
    min-height: 100vh;
}

.beautiful-colors {
    background:#03440C;
}
</style>