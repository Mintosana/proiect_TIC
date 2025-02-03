<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h2 class="text-center" style="color:white">Reserved Birds</h2>
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
            try{
                const response = await axios.put(`${process.env.VUE_APP_BACK_END_HOST}/api/users/boughtBirdForUser`,{
                userId:dataArray[0],
                birdId:dataArray[1],
            });
            }catch(error){
                console.log(`An error has occured while trying to accept bird: ${bird}`)
            }
            console.log(`Accepted offer for bird with ID: ${dataArray[1]}`);
        },
        async rejectBird(dataArray) {
            try{
                const response = await axios.put(`${process.env.VUE_APP_BACK_END_HOST}/api/users/rejectBirdForUser`,{
                userId:dataArray[0],
                birdId:dataArray[1],
            });
            }catch(error){
                console.log(`An error has occured while trying to reject bird: ${bird}`)
            }
            console.log(`Rejected offer for bird with ID: ${dataArray[1]}`);
        },
    },
};
</script>
