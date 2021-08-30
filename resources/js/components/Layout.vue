<template>
    <v-app>

        <!-- верхний хедер -->
        <v-app-bar
            color="blue"
            app
        >
            <v-col class="d-flex">

                <!-- иконка -->
                <v-app-bar-nav-icon>
                </v-app-bar-nav-icon>

                <!-- название сайта -->
                <v-app-bar-title
                    class="d-flex align-center"
                >
                    <router-link to="/">
                        Гадание
                    </router-link>
                </v-app-bar-title>

                <!-- разделитель -->
                <v-spacer></v-spacer>

                <!-- кнопки главная и др.страницы -->
                <v-btn
                    v-for="item in nav"
                    :to="item.path"
                    :key="item.path"
                    v-if="item.auth === 'both' || item.auth === auth.login"
                    class="m-1"
                >
                    {{ item.title }}
                </v-btn>

                <!-- разделитель -->
                <v-spacer></v-spacer>

                <!-- кнопки регистрация/вход -->
                <v-btn
                    v-for="item in authNav"
                    :to="item.path"
                    :key="item.path"
                    v-if="item.auth === auth.login"
                    class="m-1"
                >
                    {{ item.title }}
                </v-btn>

                <!-- аватарка пользователя -->
                <!-- <v-avatar size="55" v-if="auth.login">-->
                <!-- <img :src="profileImage">-->
                <!-- </v-avatar>-->

                <!-- имя пользователя с ниспадающим меню -->
                <v-menu
                    v-if="auth.login"
                    offset-y>

                    <template v-slot:activator="{ on, activator }">
                        <v-btn
                            v-bind="activator"
                            v-on="on"
                            class="m-1"
                        >
                            {{ auth.name }}
                        </v-btn>
                    </template>

                    <v-list>
                        <v-list-item
                            v-for="item in profileNav"
                            :key="item.path"
                            @click="onClick(item)"
                        >
                            {{ item.title }}
                        </v-list-item>
                    </v-list>
                </v-menu>

            </v-col>

        </v-app-bar>

        <!-- основной контент -->
        <v-main>
            <v-container>

                <!-- компонент Vue-роутинга -->
                <router-view></router-view>
            </v-container>
        </v-main>

        <!-- нижний футер -->
        <v-footer
        >
            <v-col
                class="text-right"
            >
                Титов Сергей. All right reserved. 2021
            </v-col>
        </v-footer>

        <!-- окно сообщений -->
        <v-snackbar top
                    :timeout="info.timeout"
                    v-model="info.show"
                    color="info"
        >
            {{ info.text }}
            <v-btn dark @click.native="info.show = false">
                Закрыть
            </v-btn>
        </v-snackbar>

    </v-app>
</template>

<script>

import {mapState} from "vuex";
import Auth from "../helpers/Auth";

export default {
    created() {
        Auth.init();
    },

    computed: {
        ...mapState([
            "info",
            "nav",
            "authNav",
            "profileNav"]),
        auth() {
            return this.$store.state.Auth;
        },

        profileImage() {
            return this.$store.state.Auth.photo;
        }
    },

    data() {
        return {
            active: null
        };
    },

    methods: {
        onClick(item) {

            // все другие клики, кроме logout
            if (item.path !== "/logout") {
                this.$router.push(item.path);
                return true;
            }

            // если logout
            axios.post("/api/logout").then(response => {
                if (response.data.success) {
                    Auth.logout();
                    this.$router.push("/");
                }
            });
        }
    }
};
</script>
