<template>
    <section>
        <v-container>
            <v-layout>

                <v-card
                    :loading="(myClickN < 6)"
                    width="100%"
                    class="mx-auto pa-5"
                >

                    <v-card-title>
                        <h3>
                            Введите, пожалуйста, Ваш вопрос и сгенерируйте гексараму случайным образом
                        </h3>
                    </v-card-title>

                    <v-card-subtitle>
                        Можете нажать 6-ть раз мышкой или нажать на клавиатуре Enter (еще {{ 6 - myClickN }} раз...)
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

export default {

    data() {
        return {
            myLines: [], // генерируемые после клика полоски
            myClickN: 0, // кол-во кликов или нажатий Пользователя
            myObject: {}, // полученная гексарама

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
            'STATE_geksarama',
            'STATE_geksaramaArr',
            'STATE_geksaramaCurrent',
            'STATE_geksaramaCurrentIsShow',
        ]),
        // двунаправленное вычисляемое свойство с vuex
        STATE_questionUser: {
            get () {
                return this.$store.state.STATE_questionUser;
            },
            set (value) {
                this.$store.commit('MUTATTION_questionUser', value)
            }
        }
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

            // гексарама текущая отображается сейчас
            this.$store.dispatch("ACTION_geksaramaCurrentIsShow", false);
            // вопрос Пользователя
            this.$store.dispatch("ACTION_questionUser", '');

            this.myClickN = 0;
            this.myLines = [];
            this.myObject = {};
        },

        // ------------------------------------------------------------------
        // нажатие клавиш
        funOnKeyDown() {

            switch (event.key) {
                case "Enter":
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
                // вопрос Пользователя
                this.$store.dispatch("ACTION_questionUser", this.STATE_questionUser);
                // гексарама текущая
                this.$store.dispatch("ACTION_geksaramaCurrent", this.myObject);
            }
        },

        // ------------------------------------------------------------------
        // клик на закрыть подробности гексарамы
        funClose() {

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
