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
            const res = await fetch(
                `${process.env.VUE_APP_BACK_END_HOST}/api/birds/getBirdById/${birdId}`
            );
            if (!res.ok) throw new Error("Failed to fetch bird details");
            this.bird = await res.json();
        } catch (error) {
            console.error(error);
        }
    },
    methods: {
        buyBird() {
            console.log(`ai cumparat pasarea ${this.bird.name}`)
        },
    },
};
</script>

<style>
.beautiful-colors {
    background: linear-gradient(142deg,
            rgba(23, 173, 162, 1) 0%,
            rgba(201, 102, 95, 1) 34%,
            rgba(200, 218, 49, 1) 66%,
            rgba(74, 255, 0, 1) 100%);
    min-height: 100vh;
}
</style>