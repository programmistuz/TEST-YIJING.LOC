<template>
    <section>
        <v-container>
            <v-layout>

                <v-card
                    width="100%"
                >

                    <v-card-title>
                        <h2>
                            Введение
                        </h2>
                    </v-card-title>

                    <v-card-text>
                        Книга Перемен — древнекитайский философский трактат, предназначенный для гадания.
                        В основе гадания 64 гексаграммы, каждая из которых имеет толкование. Гексаграммы состоят из шести линий. Линии бывают двух типов - цельные и прерванные посредине.
                    </v-card-text>

                    <v-card-actions>
                        <v-btn
                            color="orange"
                            text
                            to="/geksarama-spisok"
                            key="/geksarama-spisok"
                        >
                            Приступить к гаданию...
                        </v-btn>
                    </v-card-actions>

                </v-card>

            </v-layout>
        </v-container>
    </section>
</template>

<script>

import {mapState} from "vuex";

export default {

    computed: {
        ...mapState([
            'STATE_loading',
        ]),
    },

    methods: {
        onUpload() {
            this.$router.push("/upload_file");
        },

        onBrowse() {
            this.$router.push("/browse_files");
        }
    }
};
</script>
