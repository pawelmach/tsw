<template>
    <div>
        <v-toolbar flat color="white">
            <v-toolbar-title v-if="namespace">{{namespace.toUpperCase()}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-flex xs8>
                <component :is="search"
                           :key="namespace"
                           @filtered="filtered($event)"
                           :namespace="namespace"
                           v-if="toggleSearch"
                />
            </v-flex>
            <v-btn @click="toggleSearch = !toggleSearch" icon>
                <v-icon>search</v-icon>
            </v-btn>
            <v-btn primary @click="dialog = true">
                Dodaj
            </v-btn>
            <component
                :is="currDialog"
                :editItem="editItem"
                :open="dialog"
                @close="dialog = false; editItem = undefined"
            />
        </v-toolbar>

        <v-data-table
            :headers="headers"
            :items="items"
            class="elevation-1"
            expand
        >
            <template v-slot:items="props">
                <component
                    :is="currItem"
                    :props="props"
                >
                    <td class="text-xs-right">
                        <v-icon
                            small
                            class="mr-2"
                            @click="edit(props.item)"
                        >
                            edit
                        </v-icon>
                        <v-icon
                            small
                            @click="remove(props.item)"
                        >
                            delete
                        </v-icon>
                    </td>
                </component>
            </template>
            <template slot="expand" slot-scope="props">
                <component
                    :is="currExpand"
                    :props="props"
                />
            </template>
        </v-data-table>
    </div>
</template>

<script>
    import Wyszukiwarka from '@/components/Wyszukiwarka.vue';
    import SedziowieDialog from '@/components/sedziowie/SedziowieDialog.vue';
    import SedziowieItem from '@/components/sedziowie/SedziowieItem.vue';
    import SedziowieItemExpand from '@/components/sedziowie/SedziowieItemExpand.vue';
    import KonieItem from '@/components/konie/KonieItem.vue';
    import KonieDialog from '@/components/konie/KonieDialog.vue';
    import KonieItemExpand from '@/components/konie/KonieItemExpand.vue';
    import KlasyItem from '@/components/klasy/KlasyItem.vue';
    import KlasyItemExpand from '@/components/klasy/KlasyItemExpand.vue';
    import KlasyDialog from '@/components/klasy/KlasyDialog.vue';

    export default {
        name: 'list',
        data () {
            return {
                toggleSearch: false,
                dialog: false,
                editItem: undefined,
                loadedData: false,
                filteredItems: [],
                search: Wyszukiwarka
            };
        },
        components: {
            'klasy-Item': KlasyItem,
            'klasy-ItemExpand': KlasyItemExpand,
            'klasy-Dialog': KlasyDialog,
            'konie-Item': KonieItem,
            'konie-Dialog': KonieDialog,
            'konie-ItemExpand': KonieItemExpand,
            'sedziowie-Item': SedziowieItem,
            'sedziowie-Dialog': SedziowieDialog,
            'sedziowie-ItemExpand': SedziowieItemExpand,
            Wyszukiwarka
        },
        props: ['namespace'],
        computed: {
            currItem () {
                return this.namespace + '-Item';
            },
            currExpand () {
                return this.namespace + '-ItemExpand';
            },
            currDialog () {
                return this.namespace + '-Dialog';
            },
            headers () {
                let headers = this.$store.getters[this.namespace + '/getHeaders'];
                let hl = this.$store.getters[this.namespace + '/getHeadersLength'];
                if (headers.length < hl) {
                    headers.push({ text: 'Operacje', value: 'name', sortable: false, align: 'right' });
                }
                return headers;
            },
            items: {
                get () {
                    if (!this.toggleSearch) {
                        return this.$store.getters[this.namespace + '/getAll'];
                    }
                    return this.filteredItems;
                },
                set (items) {
                    this.filteredItems = items;
                }
            }
        },
        methods: {
            filtered (items) {
                this.filteredItems = items;
            },
            edit (item) {
                this.editItem = Object.assign({}, item);
                this.dialog = true;
            },
            remove (item) {
                console.log(`${this.namespace} delete`);
                this.$socket.emit(`${this.namespace} delete`, item);
            }
        }
    };
</script>

<style>

</style>
