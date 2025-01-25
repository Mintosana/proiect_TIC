<template>
    <v-container class="d-flex align-center justify-center min-vh-100 beautiful-colors">
        <v-card width="400" class="p-4" style="background-color: #246f27; color: white;">
            <v-card-title class="text-h5 text-center" style="color: orange;">{{ isLogin ? 'Login' : 'Register'
                }}</v-card-title>
            <v-card-text>
                <v-form ref="form" v-model="valid">
                    <div v-if="isLogin">
                        <v-text-field v-model="loginForm.email" label="Email" required type="email" color="orange" />
                        <v-text-field v-model="loginForm.password" label="Password" required type="password"
                            color="orange" />
                    </div>


                    <div v-else>
                        <v-text-field v-model="registerForm.username" label="Username" required color="orange" />
                        <v-text-field v-model="registerForm.email" label="Email" required type="email" color="orange" />
                        <v-text-field v-model="registerForm.phoneNumber" label="Phone Number" required color="orange" />
                        <v-text-field v-model="registerForm.password" label="Password" required type="password"
                            color="orange" />
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
        };
    },
    methods: {
        toggleForm() {
            this.isLogin = !this.isLogin;
        },
        async handleLogin() {
            // NU UITA DE LOGICA SI VALIDARI
            // console.log('Logging in with:', this.loginForm);
            try {
                const response = await axios.post(`${process.env.VUE_APP_BACK_END_HOST}/api/users/loginUser`, {
                    email: this.loginForm.email,
                    password: this.loginForm.password,
                },
                    {
                        withCredentials: true,
                    });
                console.log("Login Success:", response.data);
            } catch (error) {
                console.error("Login Error:", error.response?.data || error.message);
            }
        },
        async handleRegister() {
            // TO DO : FINISH VALIDATION
            // const missingFields = [];
            // if (!this.registerForm.username) missingFields.push("username");
            // if (!this.registerForm.email) missingFields.push("email");
            // if (!this.registerForm.phoneNumber) missingFields.push("phoneNumber");
            // if (!this.registerForm.password) missingFields.push("password");
            // if (missingFields.length > 0) {
            //     return this.$emit('error', `Missing fields: ${missingFields.join(', ')}`);
            // }

            // if (this.registerForm.username.length < 3) {
            //     return this.$emit('error', 'Username must have at least 3 characters');
            // }
            // if (!this.registerForm.email.match(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim)) {
            //     return this.$emit('error', 'Invalid email format');
            // }
            // if (this.registerForm.phoneNumber.length !== 10 || !/^\d+$/.test(this.registerForm.phoneNumber)) {
            //     return this.$emit('error', 'Phone number must have exactly 10 digits and contain only numbers');
            // }
            console.log('Registering with:', this.registerForm);
            try {
                const response = await axios.post(`${process.env.VUE_APP_BACK_END_HOST}/api/users/createUser`, {
                    username: this.registerForm.username,
                    email: this.registerForm.email,
                    phoneNumber: this.registerForm.phoneNumber,
                    password: this.registerForm.password,
                });
                console.log("User has been created!");
            } catch (error) {
                console.error("Login Error:", error.response?.data || error.message);
            }
        },
    },
};
</script>

<style scoped>
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
