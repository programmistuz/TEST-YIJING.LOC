<template>
    <section>
        <v-container>
            <v-layout>

                <v-card
                    :loading="STATE_loading"
                    width="100%"
                >

                    <v-card-title>
                        <h2>
                            Выбор гексарамы из списка
                        </h2>
                    </v-card-title>

                    <v-card-subtitle>
                        Перемешайте гексарамы и кликните на нужной
                    </v-card-subtitle>

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
                        <GeksaranaSVGComponent></GeksaranaSVGComponent>
                    </v-card-text>

                    <!-- раскрывающаяся карточка  -->
                    <v-expand-transition>
                        <v-card
                            v-if="STATE_geksarabaCurrentIsShow && STATE_geksarabaCurrent !== {}"
                            class="transition-fast-in-fast-out v-card--reveal"
                            style="height: 100%;"
                        >

                            <v-card-title>
                                <h2>
                                    Толкование
                                    {{ STATE_geksarabaCurrent.id }} - {{ STATE_geksarabaCurrent.name }}
                                </h2>
                            </v-card-title>

                            <v-card-text>
                                {{ STATE_geksarabaCurrent.text }}
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
import GeksaranaSVGComponent from "../geksarama/geksarama_all_component";

export default {
    components: {
        GeksaranaSVGComponent,
    },

    computed: {
        ...mapState([
            'STATE_loading',
            'STATE_geksaramaArr',
            'STATE_geksarabaCurrent',
            'STATE_geksarabaCurrentIsShow',
        ]),
    },

    created() {

        Auth.check();
        // гексарама текущая отображается сейчас
        this.$store.dispatch("ACTION_geksaramaCurrentIsShow", false);
    },

    methods: {

        // ------------------------------------------------------------------
        // клик на перемешать
        funShuffleClick() {

            // гексарама - перемешанный массив гексарам
            this.$store.dispatch("ACTION_geksaramaArr");
        },

        // клик на закрыть подробности гексарамы
        funClose() {
            // гексарама текущая отображается сейчас
            this.$store.dispatch("ACTION_geksaramaCurrentIsShow", false);

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
