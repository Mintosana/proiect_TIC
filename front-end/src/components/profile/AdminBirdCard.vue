<template>
    <v-col cols="12" sm="6" md="4" lg="3">
        <v-card class="mx-auto" max-width="350" elevation="4">
            <v-img :src="bird.photo" class="bird-image"></v-img>
            <v-card-title>{{ bird.name }}</v-card-title>
            <v-card-subtitle>{{ bird.species }}</v-card-subtitle>
            <v-card-text>
                <p><strong>Age:</strong> {{ bird.age }} years</p>
                <p><strong>Price:</strong> ${{ bird.price }}</p>
                <p class="text-truncate">{{ bird.description }}</p>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-text class="user-info">
                <v-card-subtitle>User Data</v-card-subtitle>
                <p><strong>Name:</strong> {{ user.username || "Loading..." }}</p>
                <p><strong>Email:</strong> {{ user.email || "Loading..." }}</p>
                <p><strong>Phone:</strong> {{ user.phoneNumber || "Loading..." }}</p>
            </v-card-text>

            <v-card-actions class="justify-center">
                <v-btn color="red" @click="$emit('reject', [bird.buyer,bird.id])">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-btn color="green" @click="$emit('accept', [bird.buyer,bird.id])">
                    <v-icon>mdi-check</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-col>
</template>

<script>
import axios from "axios";

export default {
    name: "BirdCard",
    props: {
        bird: Object
    },
    data() {
        return {
            user: {}
        };
    },
    mounted() {
        this.fetchUserData();
    },
    methods: {
        async fetchUserData() {
            try {
                const response = await axios.get(`${process.env.VUE_APP_BACK_END_HOST}/api/users/getUserById/${this.bird.buyer}`);
                this.user = response.data;
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
    }
};
</script>

<style scoped>
.bird-image {
    height: 16rem;
    object-fit: cover !important;
    object-position: top !important;
}

.text-truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.user-info {
    background: #f8f9fa;
    padding: 10px;
    border-radius: 8px;
    text-align: center;
}

.v-card-actions {
    display: flex;
    justify-content: center;
    gap: 10px;
}
</style>
