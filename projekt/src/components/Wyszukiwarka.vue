<template>
    <v-form>
        <v-layout nowrap align-center>
            <v-flex xs5>
                <v-select
                    :items="searchBy"
                    v-model="by"
                    item-text="text"
                    item-value="value"
                    box
                    label="Filtruj przez"
                ></v-select>
            </v-flex>
            <v-flex>
                <v-text-field
                    @input="filter()"
                    box
                    placeholder="Szukaj"
                    v-model="value"
                ></v-text-field>
            </v-flex>
        </v-layout>
    </v-form>
</template>

<script>
    // import { mapGetters } from 'vuex';
    export default {
        data () {
            return {
                by: 'numer',
                value: ''
            };
        },
        props: ['namespace'],
        computed: {
            search () {
                return this.$store.getters[this.namespace + '/search'];
            },
            searchBy () {
                return this.$store.state[this.namespace].headers;
            }
        },
        methods: {
            filter () {
                this.$emit('filtered', this.search(this.value, this.by));
            }
        },
        created () {
            this.by = this.searchBy[0].value;
            this.filter();
        }
    };
</script>
