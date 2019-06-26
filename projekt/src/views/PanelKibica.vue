<template>
    <v-layout row>
        <v-flex xs4>
            <v-card>
                <v-toolbar color="info">
                    <v-toolbar-title>Klasy</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <div>
                        <v-checkbox v-model="finished" label="Zakończone"></v-checkbox>
                    </div>
                </v-toolbar>

                <v-list>
                    <v-list-tile
                        v-for="klasa in klasy"
                        :key="klasa.id"
                        :to="'/panelkibica/'+klasa.id"
                    >
                        <v-list-tile-content>
                            <v-list-tile-title>Klasa {{klasa.numer}}</v-list-tile-title>
                            <v-list-tile-sub-title>Kategoria: {{klasa.kat}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-card>
        </v-flex>
        <v-divider vertical></v-divider>
        <v-flex xs8>
            <router-view></router-view>
        </v-flex>
    </v-layout>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
        data () {
            return {
                finished: true,
                filteredKlasy: []
            };
        },
        computed: {
            ...mapState('klasy', ['klasy'])
        }
    };
</script>
