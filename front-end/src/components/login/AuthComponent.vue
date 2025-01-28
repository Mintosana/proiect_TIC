<template>
    <v-container class="d-flex align-center justify-center min-vh-100 beautiful-colors">
        <v-card width="400" class="p-4" style="background-color: #246f27; color: white;">
            <v-card-title class="text-h5 text-center" style="color: orange;">
                {{ isLogin ? 'Login' : 'Register' }}
            </v-card-title>
            <v-card-text>
                <v-form ref="form" v-model="valid">
                    <div v-if="isLogin">
                        <v-text-field v-model="loginForm.email" :rules="emailRules" label="Email" required type="email"
                            color="orange" />
                        <v-text-field v-model="loginForm.password" :rules="passwordRules" label="Password" required
                            type="password" color="orange" />
                    </div>
                    <div v-else>
                        <v-text-field v-model="registerForm.username" :rules="usernameRules" label="Username" required
                            color="orange" />
                        <v-text-field v-model="registerForm.email" :rules="emailRules" label="Email" required
                            type="email" color="orange" />
                        <v-text-field v-model="registerForm.phoneNumber" :rules="phoneNumberRules" label="Phone Number"
                            required color="orange" />
                        <v-text-field v-model="registerForm.password" :rules="passwordRules" label="Password" required
                            type="password" color="orange" />
                    </div>
                </v-form>
            </v-card-text>
            <v-card-actions class="d-flex flex-column align-center">
                <v-btn v-if="isLogin" :disabled="!valid" style="background-color: orange; color: white; width: 50%;"
                    @click="handleLogin">
                    Login
                </v-btn>
                <v-btn v-else :disabled="!valid" style="background-color: orange; color: white; width: 50%;"
                    @click="handleRegister">
                    Register
                </v-btn>
                <v-btn text style="color: orange;" @click="toggleForm">
                    {{ isLogin ? "Don't have an account? Register" : "Go to Login" }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            isLogin: true,
            valid: false,
            loginForm: {
                email: '',
                password: '',
            },
            registerForm: {
                username: '',
                email: '',
                phoneNumber: '',
                password: '',
            },
            usernameRules: [
                v => !!v || 'Username is required.',
                v => v.length >= 3 || 'Username must have at least 3 characters.',
            ],
            emailRules: [
                v => !!v || 'E-mail is required.',
                // v => /.+@.+\..+/.test(v) || 'E-mail must be valid.',
                v => /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim.test(v) || 'E-mail must be valid.',

            ],
            phoneNumberRules: [
                v => !!v || 'Phone number is required.',
                v => /^[0-9+()]+$/.test(v) || 'Phone must contain numbers only.',
                v => v.length === 10 || 'Phone number must be exactly 10 digits (07...).'
            ],
            passwordRules: [
                //MARESTE MAI MULT DUPA CE TERMINI DE TESTAT!!!
                v => !!v || 'Password is required.',
                v => v.length >= 4 || 'Password must be at least 4 characters long.',
            ],
        };
    },
    methods: {
        toggleForm() {
            this.isLogin = !this.isLogin;
        },
        async handleLogin() {
            try {
                const response = await axios.post(`${process.env.VUE_APP_BACK_END_HOST}/api/users/loginUser`, {
                    email: this.loginForm.email,
                    password: this.loginForm.password,
                });
                if (response.status === 200) {
                    //console.log("Login Success:", response);
                    this.$store.commit("setToken", response.data.token);
                    this.$store.commit("setUserId", response.data.userId);
                    this.$router.push('/homepage')
                }

            } catch (error) {
                console.error("Login Error:", error.response?.data || error.message);
            }
        },
        async handleRegister() {
            try {
                const response = await axios.post(`${process.env.VUE_APP_BACK_END_HOST}/api/users/createUser`, {
                    username: this.registerForm.username,
                    email: this.registerForm.email,
                    phoneNumber: this.registerForm.phoneNumber,
                    password: this.registerForm.password,
                });
                console.log("User has been created!");
                this.toggleForm();
            } catch (error) {
                console.error("Registration Error:", error.response?.data || error.message);
            }
        },
    },
};
</script>

<style>
html {
    overflow-y: auto
}

.min-vh-100 {
    min-height: 100vh;
}

.v-container {
    min-width: 100% !important;
}

.beautiful-colors {
    background: rgb(23, 173, 162);
    background: linear-gradient(142deg, rgba(23, 173, 162, 1) 0%, rgba(201, 102, 95, 1) 34%, rgba(200, 218, 49, 1) 66%, rgba(74, 255, 0, 1) 100%);
}
</style>