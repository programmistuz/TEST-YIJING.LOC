<template>
    <section>

        <!-- вывод всех гексарам -->
        <v-row v-for="y in 8" :key="y">
            <v-col v-for="x in 8" :key="x">
                <GeksaranaOneComponent
                    :id="STATE_geksaramaArr[(x*y-1)]"
                >
                </GeksaranaOneComponent>
            </v-col>
        </v-row>

    </section>
</template>

<script>

import {mapState} from "vuex";
import GeksaranaOneComponent from "./geksarama_one_component";

export default {

    components: {
        GeksaranaOneComponent,
    },

    computed: {
        ...mapState(['STATE_geksaramaArr',]),
    },

    created() {
        // гексарама - перемешанный массив гексарам
        this.$store.dispatch("ACTION_geksaramaArr");
    },

    methods: {},
}
</script>
