<template>
    <section>

        <!-- вывод всех гексарам -->
        <v-row v-for="y in 8" :key="y">
            <v-col v-for="x in 8" :key="x">
                <GeksaramaOneComponent
                    :id="STATE_geksaramaArr[(x*y-1)]"
                >
                </GeksaramaOneComponent>
            </v-col>
        </v-row>

    </section>
</template>

<script>

import {mapState} from "vuex";
import GeksaramaOneComponent from "./geksarama_one_component";

export default {

    components: {
        GeksaramaOneComponent,
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
