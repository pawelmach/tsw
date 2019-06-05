<template>
    <div class="listaklas">
        <h2>Klasy</h2>
        <div class="wyszukiwarka">
            <span>Filtruj przez: </span>
            <select v-model="searchBy">
                <option>Numer</option>
                <option>Kategoria</option>
            </select>
            <input v-model="search" @input="filter()">
        </div>
        <div class="lista">
            <div class="kon"
                 :class="{selected: selected === klasa.id}"
                 v-for="klasa in filteredList"
                 :key="klasa.id"
                 @click="clicked(klasa.id)"
            >
                <span class="numer">{{klasa.numer}}</span>
                <span class="kategoria">{{klasa.kat}}</span>
            </div>
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
            }
        },
        mounted () {
            this.$forceUpdate();
            this.filter();
        }
    };
</script>

<style lang="less">

</style>
