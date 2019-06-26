<template>
    <v-dialog v-model="show" max-width="500px">
        <v-card>
            <v-card-title>
                Klasa
            </v-card-title>

            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex>
                            <v-text-field
                                v-model="klasa.numer"
                                label="Numer">
                            </v-text-field>
                        </v-flex>
                        <v-flex>
                            <v-text-field
                                v-model="klasa.kat"
                                label="Kategoria">
                            </v-text-field>
                        </v-flex>
                        <v-flex>
                            <v-flex>
                                <Wyszukiwarka
                                    @filtered="filter($event)"
                                    namespace='sedziowie'
                                />
                            </v-flex>
                            <v-flex>
                                <v-select
                                    v-model="klasa.komisja"
                                    :items="filteredSedziowie"
                                    item-text="sedzia"
                                    item-value="id"
                                    label="Komisja"
                                    multiple
                                    chips
                                ></v-select>
                            </v-flex>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat primary @click="show = false">Anuluj</v-btn>
                <v-btn flat primary @click="save">Zapisz</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import Wyszukiwarka from '@/components/Wyszukiwarka.vue';
    import { mapState } from 'vuex';
    export default {
        components: {
            Wyszukiwarka
        },
        data () {
            return {
                filteredSedziowie: [],
                klasa: {
                    id: null,
                    numer: null,
                    kat: '',
                    komisja: []
                }
            };
        },
        props: ['open', 'editItem'],
        created () {
            this.filteredSedziowie = this.sedziowie;
        },
        watch: {
            editItem (n, o) {
                if (n !== undefined) {
                    this.klasa = n;
                }
            }
        },
        computed: {
            ...mapState('sedziowie', ['sedziowie']),
            show: {
                get () {
                    return this.open;
                },
                set (value) {
                    if (!value) {
                        this.$emit('close');
                    }
                }
            }
        },
        methods: {
            save () {
                if (this.klasa.id === null) {
                    this.$socket.emit('klasa add', this.klasa);
                } else {
                    this.$socket.emit('klasa edit', this.klasa);
                }
                this.$emit('close');
            },
            filter (filteredData) {
                this.filteredSedziowie = filteredData;
            }
        }
    };
</script>

<style>

</style>
