<template>
    <div>
        <v-toolbar flat color="white">
            <v-toolbar-title>{{namespace.toUpperCase()}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-flex xs8>
                <Wyszukiwarka
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
                :key="Date.now()"
                :is="dialogComp"
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
                <component :key="Date.now()" :is="itemComp" :props="props">
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
                <component :key="Date.now()" :is="itemExComp" :props="props"/>
            </template>
        </v-data-table>
    </div>
</template>

<script>
    import Wyszukiwarka from '@/components/Wyszukiwarka.vue';
    let ns;
    function load (type) {
        return import(`./${ns}/${ns.charAt(0).toUpperCase()}${ns.slice(1)}${type}.vue`);
    };

    export default {
        name: 'list',
        data () {
            return {
                toggleSearch: false,
                dialog: false,
                editItem: undefined,
                loadedData: false,
                filteredItems: [],
                itemComp: 'Item',
                itemExComp: 'ItemExpand',
                dialogComp: 'Dialog'
            };
        },
        components: {
            Item: () => load('Item'),
            ItemExpand: () => load('ItemExpand'),
            Dialog: () => load('Dialog'),
            Wyszukiwarka
        },
        props: ['namespace'],
        watch: {
            namespace: function (newVal) {
                ns = newVal;
                load('Item').then(comp => { this.itemComp = comp; });
                load('ItemExpand').then(comp => { this.itemExComp = comp; });
                load('Dialog').then(comp => { this.dialogComp = comp; });
                this.$forceUpdate();
            }
        },
        computed: {
            headers () {
                let headers = this.$store.getters[this.namespace + '/getHeaders'];
                headers.push({ text: 'Operacje', value: 'name', sortable: false, align: 'right' });
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
        },
        created () {
            ns = this.namespace;
        }
    };
</script>

<style>

</style>
