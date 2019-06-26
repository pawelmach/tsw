<template>
    <v-dialog v-model="show" max-width="500px">
        <v-card>
            <v-card-title>
                Koń
            </v-card-title>

            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex>
                            <v-text-field
                                v-model="kon.numer"
                                label="Numer">
                            </v-text-field>
                        </v-flex>
                        <v-flex>
                            <v-text-field
                                v-model="kon.nazwa"
                                label="Nazwa">
                            </v-text-field>
                        </v-flex>
                        <v-flex>
                            <v-text-field
                                v-model="kon.klasa"
                                label="Klasa">
                            </v-text-field>
                        </v-flex>
                        <v-flex>
                            <v-text-field
                                v-model="kon.kraj"
                                label="Kraj">
                            </v-text-field>
                        </v-flex>
                        <v-flex>
                            <v-text-field
                                v-model="kon.rocznik"
                                label="Rocznik">
                            </v-text-field>
                        </v-flex>
                        <v-flex>
                            <v-text-field
                                v-model="kon.masc"
                                label="Maść">
                            </v-text-field>
                        </v-flex>
                        <v-flex>
                            <v-text-field
                                v-model="kon.plec"
                                label="Płeć">
                            </v-text-field>
                        </v-flex>
                        <v-flex>
                            <v-text-field
                                v-model="kon.hodowca.nazwa"
                                label="Hodowca nazwa">
                            </v-text-field>
                        </v-flex>
                        <v-flex>
                            <v-text-field
                                v-model="kon.hodowca.kraj"
                                label="Hodowca kraj">
                            </v-text-field>
                        </v-flex>
                        <v-flex>
                            <v-text-field
                                v-model="kon.wlasciciel.nazwa"
                                label="Właściciel nazwa">
                            </v-text-field>
                        </v-flex>
                        <v-flex>
                            <v-text-field
                                v-model="kon.wlasciciel.kraj"
                                label="Właściciel kraj">
                            </v-text-field>
                        </v-flex>
                        <v-flex>
                            <v-text-field
                                v-model="kon.rodowod.o.nazwa"
                                label="Ojciec nazwa">
                            </v-text-field>
                        </v-flex>
                        <v-flex>
                            <v-text-field
                                v-model="kon.rodowod.o.kraj"
                                label="Ojciec kraj">
                            </v-text-field>
                        </v-flex>
                        <v-flex>
                            <v-text-field
                                v-model="kon.rodowod.m.nazwa"
                                label="Matka nazwa">
                            </v-text-field>
                        </v-flex>
                        <v-flex>
                            <v-text-field
                                v-model="kon.rodowod.m.kraj"
                                label="Matka kraj">
                            </v-text-field>
                        </v-flex>
                        <v-flex>
                            <v-text-field
                                v-model="kon.rodowod.om.nazwa"
                                label="Ojciec matki nazwa">
                            </v-text-field>
                        </v-flex>
                        <v-flex>
                            <v-text-field
                                v-model="kon.rodowod.om.kraj"
                                label="Ojciec matki kraj">
                            </v-text-field>
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
    export default {
        data () {
            return {
                kon: {
                    id: null,
                    numer: null,
                    klasa: null,
                    nazwa: '',
                    kraj: '',
                    rocznik: null,
                    masc: '',
                    plec: '',
                    hodowca: {
                        nazwa: '',
                        kraj: ''
                    },
                    wlasciciel: {
                        nazwa: '',
                        kraj: ''
                    },
                    rodowod: {
                        o: {
                            nazwa: '',
                            kraj: ''
                        },
                        m: {
                            nazwa: '',
                            kraj: ''
                        },
                        om: {
                            nazwa: '',
                            kraj: ''
                        }
                    }
                }
            };
        },
        props: ['open', 'editItem'],
        warch: {
            editItem (n, o) {
                if (n !== undefined) {
                    this.kon = n;
                }
            }
        },
        computed: {
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
                if (this.kon.id === null) {
                    this.$socket.emit('kon add', this.kon);
                } else {
                    this.$socket.emit('kon edit', this.kon);
                }
                this.$emit('close');
            }
        }
    };
</script>

<style>

</style>
