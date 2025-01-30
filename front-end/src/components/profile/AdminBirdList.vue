<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h2 class="text-center">Reserved Birds</h2>
            </v-col>
        </v-row>

        <v-row>
            <AdminBirdCard 
                v-for="bird in birds" 
                :key="bird.id" 
                :bird="bird" 
                @accept="acceptBird" 
                @reject="rejectBird" 
            />
        </v-row>
    </v-container>
</template>

<script>
import axios from "axios";
import AdminBirdCard from "./AdminBirdCard.vue";

export default {
    components: {
        AdminBirdCard,
    },
    data() {
        return {
            birds: [],
        };
    },
    mounted() {
        this.fetchPendingBirds();
    },
    methods: {
        async fetchPendingBirds() {
            try {
                const response = await axios.get(`${process.env.VUE_APP_BACK_END_HOST}/api/birds/getBirdsWithPendingBuyState`);
                this.birds = response.data;
                // console.log(this.birds);
            } catch (error) {
                console.error("Error fetching birds with pending buy state:", error);
            }
        },
        async acceptBird(dataArray) {
            const response = await axios.put(`${process.env.VUE_APP_BACK_END_HOST}/api/users/boughtBirdForUser`,{
                userId:dataArray[0],
                birdId:dataArray[1],
            });
            console.log(response);
            console.log(`Accepted offer for bird with ID: ${dataArray[1]}`);
        },
        async rejectBird(id) {
            console.log(`Rejected offer for bird with ID: ${id}`);
        },
    },
};
</script>
