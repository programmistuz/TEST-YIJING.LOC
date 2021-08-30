<template>
    <section>
        <v-container>
            <v-layout>
                <v-card width="300" class="mx-auto mt-15">

                    <v-card-title>
                        <h2>
                            Регистрация
                        </h2>
                    </v-card-title>

                    <v-card-text>

                        <v-form>
                            <v-text-field
                                label="Имя"
                                prepend-icon="mdi-account-circle"
                                v-model="form.name"
                                :error-messages="checkError('name')"
                            ></v-text-field>

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
                            ></v-text-field>

                            <v-text-field
                                label="Подтверждение пароля"
                                prepend-icon="mdi-lock"
                                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                @click:append="showPassword = !showPassword"
                                :type="showPassword ? 'text' : 'password'"
                                v-model="form.password_confirmation"
                            ></v-text-field>

                        </v-form>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>

                        <v-layout justify-center>
                            <v-btn
                                color="success"
                                @click="onRegister"
                            >
                                Регистрация
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
                name: null,
                email: null,
                password: null,
                password_confirmation: null
            },

            errors: {}
        };
    },

    computed: {
        ...mapState(['STATE_loading']),
    },

    methods: {
        onRegister() {
            this.errors = {};

            axios
                .post("/api/register", this.form)
                .then(response => {
                    if (response.data.success) {
                        Auth.login(response.data.user); // ts
                        this.$router.push("/");
                    }
                })
                .catch(error => {
                    this.errors = error.response.data.errors;
                });
        },

        checkError(field) {
            return this.errors.hasOwnProperty(field) ? this.errors[field] : [];
        }
    }
};
</script>
