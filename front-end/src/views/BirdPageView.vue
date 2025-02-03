<template>
    <v-container class="beautiful-colors">
        <HeaderComponent />
        <div v-if="bird">
            <BirdInfo :bird="bird" />
        </div>
        <div v-else class="loading-container">
            <p>Loading bird details...</p>
        </div>
    </v-container>
</template>

<script>
import HeaderComponent from "../components/general/HeaderComponent.vue";
import BirdInfo from "@/components/birdPage/BirdInfo.vue";
import axios from 'axios';

export default {
    components: {
        HeaderComponent,
        BirdInfo,
    },
    data() {
        return {
            bird: null,
        };
    },
    async created() {
        const birdId = this.$route.params.id;
        try {
            const res = await axios.get(`${process.env.VUE_APP_BACK_END_HOST}/api/birds/getBirdById/${birdId}`);
            // console.log(res);
            if (res.status != 200) throw new Error("Failed to fetch bird details");
            this.bird = res.data;
        } catch (error) {
            console.error(error);
        }
    },
    methods: {
        buyBird() {
            console.log(`You reserved bird ${this.bird.name}`)
        },
        isLoggedIn() {
            if (this.$store.state.token === null) {
                this.$router.push('/');
            }
        },
    },
    mounted(){
        this.isLoggedIn();
    }
};
</script>

<style>
.beautiful-colors {
    background: #03440C;
    min-height: 100%;
}
</style>