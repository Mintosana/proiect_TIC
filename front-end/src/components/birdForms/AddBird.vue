<template>
    <v-container id="outer-container">
        <v-card id="form-container" style="background-color: #246f27; color: white;">
            <v-card-title class="text-h5 text-center" style="color: orange;">
                Adaugă o Pasare!
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
                <v-btn :disabled="!formValid" color="orange" dark @click="submitBird">
                   Add Bird
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
        async submitBird() {
            try {
                const response = await axios.post(`${process.env.VUE_APP_BACK_END_HOST}/api/birds/createBird`, this.bird);
                this.$emit("bird-added", response.data);
                alert("The bird has been succesfully added!");
            } catch (error) {
                console.error("Error adding bird:", error);
                alert("An error has occured, please try again later.");
            }
        },
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