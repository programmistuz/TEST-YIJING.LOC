<template>
    <v-hover
        v-slot="{ hover }"
    >
        <v-card
            :elevation="hover ? 16 : 2"
            :class="{ 'on-hover': hover }"
            class="mx-auto pt-5"
            @click="funOnClick(myObject)"
        >
            <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                style="border:none;"
                width="60px"
                height="90px"
                viewBox="0 0 60 90"
                preserveAspectRatio="xMinYMin meet"
            >

                <!-- одна гексарама - линии и текст-->
                <g v-if="typeof(myObject.name) !== 'undefined'">

                    <!-- линии-->
                    <g
                        v-for="(line, index) in myObject.lines"
                        transform="translate(0,4)"
                    >
                        <g v-if="(line === 1)">

                            <!-- сплошная линия-->
                            <line
                                x1="1" :y1="(index * myObjectInterval)"
                                x2="60" :y2="(index * myObjectInterval)"
                                :stroke="myObjectColor" :stroke-width="myObjectStrokeWidth">
                            </line>

                        </g>
                        <g v-else>

                            <!-- прерывистая линия-->
                            <line
                                x1="1" :y1="(index * myObjectInterval)"
                                x2="25" :y2="(index * myObjectInterval)"
                                :stroke="myObjectColor" :stroke-width="myObjectStrokeWidth">
                            </line>
                            <line
                                x1="35" :y1="(index * myObjectInterval)"
                                x2="60" :y2="(index * myObjectInterval)"
                                :stroke="myObjectColor" :stroke-width="myObjectStrokeWidth">
                            </line>

                        </g>
                    </g>

                    <!-- текст - id -->
                    <text
                        x="30"
                        :y="6 * myObjectInterval + 10"
                        class="textID"
                        :fill="myObjectIDColor"
                        text-anchor="middle"
                    >
                        {{ myObject.id }}
                    </text>

                    <!-- текст - название -->
                    <text
                        x="30"
                        :y="6 * myObjectInterval + 20"
                        class="textName"
                        :fill="myObjectNameColor"
                        text-anchor="middle"
                    >
                        {{ ((myObject.name).length > 10) ? ((myObject.name).substring(0, 10) + '...') : myObject.name }}
                    </text>

                    <!-- всплывающий hint -->
                    <title>
                        {{ myObject.name }}
                    </title>

                </g>

            </svg>
        </v-card>
    </v-hover>
</template>

<script>

import {mapState} from "vuex";

export default {
    props: {
        id: Number, // номер гексарамы
    },

    data: function () {
        return {
            myObject: {},

            myObjectColor: 'red', // цвет
            myObjectIDColor: '#000', // цвет id
            myObjectNameColor: 'blue', // цвет названия
            myObjectStrokeWidth: 7, // толщина линий
            myObjectInterval: 9, // интервал между линиями
        }
    },

    computed: {
        ...mapState([
            'STATE_geksaramaMakeOnID',
            'STATE_geksaramaHalf',
            'STATE_geksarama',
            'STATE_geksaramaArr',
            'STATE_geksaramaCurrent']),
    },

    watch: {
        STATE_geksaramaArr: function () {
            // создать по ID
            this.funMake();
        },
    },

    mounted() {
        // создать по ID
        this.funMake();
    },

    methods: {

        // ------------------------------------------------------------------
        // создать по ID
        funMake() {

            // гексарама - создать по id
            this.$store.dispatch("ACTION_geksaramaMakeOnID", this.id);
            this.myObject = this.STATE_geksaramaMakeOnID;
        },

        // ------------------------------------------------------------------
        // клик на гексараме
        funOnClick(getObject) {

            // гексарама текущая
            this.$store.dispatch("ACTION_geksaramaCurrent", getObject);

            // избежать дублирования клика под обьектом
            event.stopPropagation();
        },
    },
}
</script>

<style scoped>
.textID {
    font-size: 12px;
}

.textName {
    font-size: 10px;
}
</style>
