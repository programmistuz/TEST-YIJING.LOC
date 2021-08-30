<template>
    <section>
        <v-container>
            <v-layout>

                <v-card
                    width="300"
                    class="mx-auto mt-15"
                >

                    <v-card-title>
                        <h2>
                            Авторизация
                        </h2>
                    </v-card-title>

                    <v-card-text>

                        <v-form>
                            <v-text-field
                                label="Email"
                                prepend-icon="mdi-email"
                                v-model="form.email"
                                :error-messages="checkError('email')"
                            ></v-text-field>

                            <v-text-field
                                label="Пароль"
                                prepend-icon="mdi-lock"
                                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                @click:append="showPassword = !showPassword"
                                :type="showPassword ? 'text' : 'password'"
                                v-model="form.password"
                                :error-messages="checkError('password')"
                                @keyup="onKeyup"
                            ></v-text-field>
                        </v-form>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>

                        <v-layout justify-center>
                            <v-btn
                                color="success"
                                @click="onLogin"
                            >
                                Войти
                            </v-btn>
                        </v-layout>
                    </v-card-actions>

                </v-card>
            </v-layout>
        </v-container>
    </section>
</template>

<script>

import {mapState} from "vuex";
import Auth from "../../helpers/Auth";

export default {

    data() {
        return {
            showPassword: false,
            form: {
                email: null,
                password: null
            },

            errors: {}
        };
    },

    computed: {
        ...mapState(['STATE_loading']),
    },

    methods: {
        onLogin() {
            this.errors = {};

            axios
                .post("/api/login", this.form)
                .then(response => {
                    if (response.data.success) {
                        Auth.login(response.data.user);
                        this.$router.push("/");
                    }
                })
                .catch(error => {
                    this.errors = error.response.data.errors;
                });
        },

        checkError(field) {
            return this.errors.hasOwnProperty(field) ? this.errors[field] : [];
        },

        onKeyup(e) {
            if (e.code === "Enter") {
                this.onLogin();
            }
        }
    }
};
</script>
