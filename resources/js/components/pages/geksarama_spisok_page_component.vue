<template>
    <section>
        <v-container>
            <v-layout>

                <v-card
                    :loading="STATE_loading"
                    width="100%"
                    class="mx-auto pa-5"
                >

                    <v-card-title>
                        <h3>
                            Введите, пожалуйста, Ваш вопрос и выберите гексараму из списка
                        </h3>
                    </v-card-title>

                    <v-card-subtitle>
                        Можете перемешать гексарамы в случайном порядке
                    </v-card-subtitle>

                    <v-text-field
                        label="Ваш вопрос"
                        prepend-icon="mdi-help"
                        type="text"
                        v-model="STATE_questionUser"
                        class="p-10"
                    ></v-text-field>

                    <v-card-actions>
                        <v-btn
                            color="orange"
                            text
                            @click="funShuffleClick"
                        >
                            Перемешать
                        </v-btn>
                    </v-card-actions>

                    <v-card-text align="center">
                        <GeksaramaSVGComponent></GeksaramaSVGComponent>
                    </v-card-text>

                    <!-- раскрывающаяся карточка  -->
                    <v-expand-transition>
                        <v-card
                            v-if="STATE_geksaramaCurrentIsShow && STATE_geksaramaCurrent !== {}"
                            class="transition-fast-in-fast-out v-card--reveal"
                            style="height: 100%;"
                        >

                            <v-card-title>
                                <h3>
                                    Толкование
                                    {{ STATE_geksaramaCurrent.id }} - {{ STATE_geksaramaCurrent.name }}
                                </h3>
                            </v-card-title>

                            <v-card-text>

                                <h4>
                                    На вопрос: <i><small>{{ STATE_questionUser }}</small></i>
                                </h4>

                                <br>

                                <h4>
                                    Ответ
                                </h4>

                                {{ STATE_geksaramaCurrent.text }}
                            </v-card-text>

                            <v-card-actions class="pt-0">
                                <v-btn
                                    color="orange"
                                    text
                                    @click="funClose"
                                >
                                    Понятно...
                                </v-btn>
                            </v-card-actions>

                        </v-card>
                    </v-expand-transition>

                </v-card>

            </v-layout>
        </v-container>
    </section>
</template>

<script>

import {mapState} from "vuex";
import Auth from "../../helpers/Auth";
import GeksaramaSVGComponent from "../geksarama/geksarama_all_component";

export default {
    components: {
        GeksaramaSVGComponent,
    },

    data() {
        return {}
    },

    computed: {
        ...mapState([
            'STATE_loading',
            'STATE_geksaramaCurrent',
            'STATE_geksaramaCurrentIsShow',
        ]),
        // двунаправленное вычисляемое свойство с vuex
        STATE_questionUser: {
            get() {
                return this.$store.state.STATE_questionUser;
            },
            set(value) {
                this.$store.commit('MUTATTION_questionUser', value)
            }
        }
    },

    created() {

        Auth.check();
        // иницилизация / сброс
        this.funInit();
    },

    methods: {

        // ------------------------------------------------------------------
        // иницилизация / сброс
        funInit() {

            // гексарама текущая отображается сейчас
            this.$store.dispatch("ACTION_geksaramaCurrentIsShow", false);
            // вопрос Пользователя
            this.$store.dispatch("ACTION_questionUser", '');
        },

        // ------------------------------------------------------------------
        // клик на перемешать
        funShuffleClick() {

            // гексарама - перемешанный массив гексарам
            this.$store.dispatch("ACTION_geksaramaArr");
        },

        // клик на закрыть подробности гексарамы
        funClose() {

            // иницилизация / сброс
            this.funInit();

            // клик на перемешать
            this.funShuffleClick();
        }
    },
}
</script>

<style scoped>

/* раскрывающаяся карточка */
.v-card--reveal {
    bottom: 0;
    opacity: 1 !important;
    position: absolute;
    width: 100%;
}
</style>
