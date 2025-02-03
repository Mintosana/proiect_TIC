<template>
    <v-container id="outer-container">
        <v-card id="form-container" style="background-color: #246f27; color: white;">
            <v-card-title class="text-h5 text-center" style="color: orange;">
                Modify Bird - {{ this.bird.name }}
            </v-card-title>
            <v-card-text>
                <v-form ref="birdForm" v-model="formValid">
                    <v-text-field v-model="bird.name" label="Nume Pasare" :rules="[rules.required]" required
                        color="orange"></v-text-field>

                    <v-text-field v-model="bird.age" label="Varsta Pasare" type="number"
                        :rules="[rules.required, rules.isNumber]" required color="orange"></v-text-field>

                    <v-textarea v-model="bird.description" label="Scurta descriere" :rules="[rules.required]" required
                        color="orange"></v-textarea>

                    <v-text-field v-model="bird.species" label="Specie Pasare" :rules="[rules.required]" required
                        color="orange"></v-text-field>

                    <v-text-field v-model="bird.price" label="Pret vanzare" type="number"
                        :rules="[rules.required, rules.isNumber]" required color="orange"></v-text-field>

                    <v-text-field v-model="bird.photo" label="Poza pasare (URL)" :rules="[rules.required, rules.isUrl]"
                        required color="orange"></v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions class="d-flex justify-center">
                <v-btn :disabled="!formValid" color="orange" dark @click="editBird">
                    Modify Bird
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            bird: {
                name: "",
                age: null,
                description: "",
                species: "",
                price: null,
                photo: "",
            },
            formValid: false,
            rules: {
                required: (value) => !!value || "Camp obligatoriu.",
                isNumber: (value) => !isNaN(value) || "Campul trebuie sa contina doar numere.",
                isUrl: (value) => /^(ftp|http|https):\/\/[^ "]+$/.test(value) || "Campul trebuie sa contina un URL valid.",
            },
        };
    },
    methods: {
        async fetchBirdData() {
            try {
                const response = await axios.get(`${process.env.VUE_APP_BACK_END_HOST}/api/birds/getBirdById/${this.$route.params.id}`);
                this.bird = response.data;
            } catch (error) {
                console.error("Eroare la obținerea datelor păsării:", error);
            }
        },
        async editBird() {
            try {
                await axios.put(`${process.env.VUE_APP_BACK_END_HOST}/api/birds/updateBirdById/${this.$route.params.id}`, this.bird);
                alert("The bird has been succesfully modified!!");
            } catch (error) {
                console.error("Eroare la actualizarea pasarii:", error);
                alert("A aparut o eroare. Te rugăm sa incerci din nou.");
            }
        },
    },
    created(){
        this.fetchBirdData();
    },
};
</script>

<style>
#outer-container {
    display: flex;
    justify-content: center;
    align-items: center;
}
#form-container{
    width: 600px;
}
</style>