<template>
    <section>
        <v-container>
            <v-layout>

                <v-card
                    :loading="(myClickN < 6)"
                    width="100%"
                >

                    <v-card-title>
                        <h2>
                            Генерация гексарамы случаным образом
                        </h2>
                    </v-card-title>

                    <v-card-subtitle>
                        Нажмите 6-ть раз мышкой или нажмите пробел (еще {{ 6 - myClickN }} раз...)
                    </v-card-subtitle>

                    <v-card-actions>
                        <v-btn
                            v-if="(myClickN > 0)"
                            color="orange"
                            text
                            @click="funInit"
                        >
                            Сбросить
                        </v-btn>
                    </v-card-actions>

                    <v-card-text
                        justify="center"
                        align="center"
                        @click="funClick($event)"
                    >

                        <v-img
                            v-if="(myClickN === 0)"
                            src="./assets/question2.svg"
                            width="300"
                        >
                        </v-img>

                        <svg
                            v-else
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            style="border:none;"
                            width="400px"
                            height="340px"
                            viewBox="0 0 400 340"
                            preserveAspectRatio="xMinYMin meet"
                        >

                            <g v-for="(line, index) in myLines"
                               transform="translate(0,20)"
                            >
                                <g v-if="(line === 1)">

                                    <!-- сплошная линия-->
                                    <line
                                        x1="1" :y1="(index * myObjectInterval)"
                                        x2="400" :y2="(index * myObjectInterval)"
                                        :stroke="myObjectColor" :stroke-width="myObjectStrokeWidth">
                                    </line>

                                </g>
                                <g v-else>

                                    <!-- прерывистая линия-->
                                    <line
                                        x1="1" :y1="(index * myObjectInterval)"
                                        x2="180" :y2="(index * myObjectInterval)"
                                        :stroke="myObjectColor" :stroke-width="myObjectStrokeWidth">
                                    </line>
                                    <line
                                        x1="220" :y1="(index * myObjectInterval)"
                                        x2="400" :y2="(index * myObjectInterval)"
                                        :stroke="myObjectColor" :stroke-width="myObjectStrokeWidth">
                                    </line>

                                </g>
                            </g>

                        </svg>

                    </v-card-text>

                    <div class="text-center">

                        <v-btn
                            v-if="myClickN === 6"
                            color="green"
                            text
                            x-large
                            class="mb-15"
                            @click="funOpen"
                        >
                            Узнать...
                        </v-btn>

                    </div>

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
            myLines: [],
            myClickN: 0,
            myObject: {},

            myObjectColor: 'red', // цвет
            myObjectIDColor: '#000', // цвет id
            myObjectNameColor: 'blue', // цвет названия
            myObjectStrokeWidth: 40, // толщина линий
            myObjectInterval: 55, // интервал между линиями
        }
    },

    computed: {
        ...mapState([
            'STATE_geksaramaArrFull',
            'STATE_geksaramaMakeOnID',
            'STATE_geksaramaHalf',
            'STATE_geksarama',
            'STATE_geksaramaArr',
            'STATE_geksarabaCurrent',
            'STATE_geksarabaCurrentIsShow',
        ]),
    },

    mounted() {

        // включить прослушку клавиатуры
        window.addEventListener("keydown", this.funOnKeyDown);
    },

    watch: {},

    created() {

        Auth.check();
        // иницилизация / сброс
        this.funInit();
        // гексарамы все - массив с линиями полная расшифровка
        this.$store.dispatch("ACTION_geksaramaArrFull");
    },

    methods: {

        // ------------------------------------------------------------------
        // иницилизация / сброс
        funInit() {

            this.myClickN = 0;
            this.myLines = [];
            this.myObject = {};
        },

        // ------------------------------------------------------------------
        // нажатие клавиш
        funOnKeyDown() {

            switch (event.key) {
                case " ":
                    // клик на холсте
                    this.funClick();
                    break;
            }
        },

        // ------------------------------------------------------------------
        // клик на холсте
        funClick(event) {

            // не реагировать, если больше 6 линрии введено уже
            if (this.myClickN >= 6) return;

            this.myClickN++;
            // записать в массив линий случаной число
            this.myLines.push(this.funRand());

            if (this.myClickN === 6) {
                // поиск
                this.funFind()
            }
        },

        // ------------------------------------------------------------------
        // поиск
        funFind() {

            // сгенерировал Пользователь
            let myLines = this.myLines;

            let myFind = {};
            this.STATE_geksaramaArrFull.map(function (item) {

                var str1 = item.lines.join('');
                var str2 = myLines.join('');
                if (str1 === str2) {
                    myFind = item;
                    console.log("Это: " + item.id);
                }
            });

            this.myObject = myFind;
        },

        // ------------------------------------------------------------------
        // случайное целое число в заданном интервале, включительно
        funRand() {

            let myMin = 0;
            let myMax = 1;
            let myRand = Math.floor(Math.random() * (myMax - myMin + 1)) + myMin;

            // возвращаемый параметр
            return myRand;
        },

        // ------------------------------------------------------------------
        // открыть подробности
        funOpen() {

            if (this.myObject !== {}) {
                // гексарама текущая
                this.$store.dispatch("ACTION_geksaramaCurrent", this.myObject);
            }
        },

        // ------------------------------------------------------------------
        // клик на закрыть подробности гексарамы
        funClose() {
            // гексарама текущая отображается сейчас
            this.$store.dispatch("ACTION_geksaramaCurrentIsShow", false);

            // иницилизация / сброс
            this.funInit();
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
