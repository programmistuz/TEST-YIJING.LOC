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
                            История вопросов
                        </h2>
                    </v-card-title>

                    <v-card-actions>
                        <v-btn
                            color="orange"
                            text
                            @click="funLoad"
                        >
                            Загрузить
                        </v-btn>
                    </v-card-actions>

                    <v-card-text>

                        <v-data-table
                            :headers="myHeader"
                            :items="myData"
                            class="elevation-1"
                            @click:row="funShow"
                        >

                            <template v-slot:item.actions="{ item }">
                                <v-icon
                                    small
                                    class="mr-2"
                                    @click="funShow(item)"
                                >
                                    mdi-pencil
                                </v-icon>
                            </template>

                        </v-data-table>

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

export default {

    data() {
        return {
            myData: [],
            myHeader: [
                {
                    text: 'id',
                    value: 'id',
                    width: '50px',
                    align: 'center',
                    sortable: false,
                },
                {
                    text: 'Вопрос',
                    value: 'question',
                    width: 'auto',
                    align: 'start',
                    sortable: false,
                },
                {
                    text: 'Гексарама',
                    value: 'geksarama_id',
                    width: 'auto',
                    align: 'start',
                    sortable: false,
                },
                {
                    text: 'Дата',
                    value: 'created_at',
                    width: '250px',
                    align: 'start',
                    sortable: false,
                },
            ],
        }
    },

    computed: {
        ...mapState([
            'STATE_loading',
            'STATE_histore',
            'STATE_geksaramaMakeOnID',
            'STATE_geksarabaCurrent',
            'STATE_geksarabaCurrentIsShow',
        ]),
    },

    mounted() {
    },

    watch: {
        STATE_histore: function () {
            this.myData = this.STATE_histore;
        },
    },

    created() {

        Auth.check();
        // гексарама текущая отображается сейчас
        this.$store.dispatch("ACTION_geksaramaCurrentIsShow", false);
        // загрузка истории
        this.funLoad();
    },

    methods: {

        // ------------------------------------------------------------------
        // загрузка истории
        funLoad() {

            // загрузка истории
            this.$store.dispatch("ACTION_historeLoad");
        },

        // ------------------------------------------------------------------
        // клик на строчке
        funShow(getItem) {

            // гексарама - создать по id
            this.$store.dispatch("ACTION_geksaramaMakeOnID", getItem.geksarama_id);

            console.log(this.STATE_geksaramaMakeOnID);

            // гексарама текущая
            this.$store.dispatch("ACTION_geksaramaCurrent", this.STATE_geksaramaMakeOnID);
            // гексарама текущая отображается сейчас
            this.$store.dispatch("ACTION_geksaramaCurrentIsShow", true);

            console.log(this.STATE_geksaramaMakeOnID);
        },

        // клик на закрыть подробности гексарамы
        funClose() {

            // гексарама текущая отображается сейчас
            this.$store.dispatch("ACTION_geksaramaCurrentIsShow", false);
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
