<template>
    <v-dialog v-model="show" max-width="500px">
        <v-card>
            <v-card-title>
                Sędziowie
            </v-card-title>

            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex>
                            <v-text-field
                                v-model="sedzia.sedzia"
                                label="Nazwa">
                            </v-text-field>
                        </v-flex>
                        <v-flex>
                            <v-text-field
                                v-model="sedzia.kraj"
                                label="Kraj">
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
                sedzia: {
                    id: null,
                    sedzia: '',
                    kraj: ''
                }
            };
        },
        props: ['open', 'editItem'],
        watch: {
            editItem (n, o) {
                if (n !== undefined) {
                    this.sedzia = n;
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
                if (this.sedzia.id === null) {
                    this.$socket.emit('sedzia add', this.sedzia);
                } else {
                    this.$socket.emit('sedzia edit', this.sedzia);
                }
                this.$emit('close');
            }
        }
    };
</script>

<style>

</style>
