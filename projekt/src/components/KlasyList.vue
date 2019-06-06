<template>
    <div class="all">
        <button @click="dodajKlase()">Dodaj</button>
        <div class="listaklas">
            <h2>Klasy</h2>
            <div class="wyszukiwarka">
                <span>Filtruj przez: </span>
                <select v-model="searchBy">
                    <option>Numer</option>
                    <option value="kat">Kategoria</option>
                </select>
                <input v-model="search" @input="filter()">
            </div>
            <div class="lista">
                <div class="klasa"
                     :class="{selected: selected === klasa.id}"
                     v-for="klasa in filteredList"
                     :key="klasa.id"
                >
                    <div class="delete">
                        <button v-if="mode" @click="deleteKlasa(klasa.id)">Usuń</button>
                    </div>
                    <span @click="clicked(klasa.id)" class="numer">{{klasa.numer}}</span>
                    <span @click="clicked(klasa.id)" class="kategoria">{{klasa.kat}}</span>
                </div>
            </div>
        </div>
        <div class="detail">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        data: () => {
            return {
                search: '',
                searchBy: 'Numer',
                filteredList: [],
                selected: -1
            };
        },
        props: ['mode'],
        computed: {
            ...mapGetters(['filterKlasy'])
        },
        methods: {
            filter () {
                this.filteredList = this.filterKlasy(this.search, this.searchBy.toLowerCase());
            },
            clicked (id) {
                this.$emit('klasaSelected', id);
                this.selected = id;
            },
            deleteKlasa (id) {
                this.$store.dispatch('deleteKlasa', id);
                this.$router.push({ path: '/konkurs/klasy' });
                this.filter();
            }
        },
        mounted () {
            this.$forceUpdate();
            this.filter();
        }
    };
</script>

<style lang="less">
    .listaklas {
        display: flex;
        flex-direction: column;
        border-radius: 25px;
        border: 1px solid black;
        flex-wrap: nowrap;
        height: 50vh;
        padding: 2px;
        // max-width:0px;
        margin: 20px;
        background-image: linear-gradient(90deg, gold, white);
        h2{
            margin:5px;
        }

    .lista {
        overflow: auto;
        padding-top: 10px;
        margin: 20px;
        margin-top: 5px;
        margin-bottom: 0px;
    .klasa{
        padding: 2px;
        display: flex;
        user-select: none;
        .numer, .kategoria {
                display: inline-flex;
                border-top: 1px solid black;
                border-bottom: 1px solid black;
                background-color: white;
                padding: 7px;
            }
            .numer{
                border-top-left-radius: 15px;
                border-bottom-left-radius: 15px;
                border-left: 1px solid black;
                background-color: #42b983;
                width: 40px;
                font-weight: bolder;
            }
            .kategoria{
                border-right: 1px solid black;
                width: 150px;
            }
            &:hover, &.selected {
                .nazwa, .kraj, .rocznik {
                    background-color: #42b983;
                    color: white;
                }
                .numer {
                    background-color: darken(gold, 10%);
                    color: white;
                }
            }
        }
    }
    }
</style>
