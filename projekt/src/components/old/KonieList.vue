<template>
    <div class="all">
        <div class="listakoni" @noweWyniki="filter()">
            <h2>Konie</h2>
            <div class="wyszukiwarka" v-if="mode !== 'ocena'">
                <span>Filtruj przez: </span>
                <select v-model="searchBy">
                    <option>Numer</option>
                    <option>Nazwa</option>
                    <option>Kraj</option>
                    <option>Rocznik</option>
                </select>
                <input v-model="search" @input="filter()">
            </div>
            <div class="lista">
                <div class="kon"
                     :class="{selected: selected === kon.id}"
                     v-for="kon in filteredList"
                     :key="kon.id"
                >
                    <div class="delete" v-if="$route.path.includes('konkurs')">
                        <button @click="deleteKon(kon.id)">Usuń</button>
                    </div>
                    <div class="medal">
                        <img v-if="kon.wynik.miejsce === 1 || kon.wynik.rozjemca === 1" src="@/assets/goldmedal.png">
                        <img v-if="kon.wynik.miejsce === 2 || kon.wynik.rozjemca === 2" src="@/assets/silvermedal.png">
                        <img v-if="kon.wynik.miejsce === 3 || kon.wynik.rozjemca === 3" src="@/assets/bronzemedal.png">
                    </div>
                    <span  @click="clicked(kon.id)" class="numer">{{kon.numer}}</span>
                    <span  @click="clicked(kon.id)" class="nazwa">{{kon.nazwa}}</span>
                    <span  @click="clicked(kon.id)" class="kraj">{{kon.kraj}}</span>
                    <span  @click="clicked(kon.id)" class="rocznik">{{kon.rocznik}}</span>
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
                selected: -1,
                klasa: undefined
            };
        },
        props: ['mode', 'klasaid'],
        watch: {
            klasaid: function (newVal, oldVal) {
                this.filter();
            },
            mode: function (newVal, oldVal) {
                newVal = oldVal;
                this.filter();
            }
        },
        computed: {
            ...mapGetters(['filterKonie'])
        },
        methods: {
            filter () {
                if (this.mode === 'ocena') {
                    console.log(this.klasaid);
                    this.filteredList = this.filterKonie(this.klasaid.toString(), 'klasa');
                    this.filteredList.sort((a, b) => {
                        let k1 = a.wynik;
                        let k2 = b.wynik;
                        if (k1.suma === k2.suma && k1.st === k2.st && k1.sr === k2.sr) {
                            return 0;
                        }
                        if (
                            k1.suma > k2.suma ||
                            (k1.suma === k2.suma && k1.st > k2.st) ||
                            (k1.suma === k2.suma && k1.st === k2.st && k1.sr > k2.sr)
                        ) { return 1; } else { return -1; }
                    });
                } else {
                    this.filteredList = this.filterKonie(this.search, this.searchBy.toLowerCase());
                }
            },
            clicked (id) {
                this.$emit('konSelected', id);
                this.selected = id;
                this.filter();
            },
            deleteKon (id) {
                this.$store.dispatch('deleteKon', id);
                this.$router.push({ path: '/konkurs/konie' });
                this.filter();
            }
        },
        created () {
            this.$forceUpdate();
            this.filter();
        }
    };
</script>

<style lang="less">

.listakoni {
    display: flex;
    padding: 2px;
    border: 1px solid black;
    border-radius: 25px;
    max-width: 350px;
    max-height: 50vh;
    flex-direction: column;
    flex-wrap: nowrap;
    margin: 20px;
    background-image: linear-gradient(270deg, #42b983, white);

    h2{ margin: 5px; }

    .lista {
        overflow: auto;
        padding-top: 10px;
        margin: 20px;
        margin-top: 5px;
        margin-bottom: 0px;

        .kon {
            padding: 2px;
            display: flex;
            user-select: none;
            .numer, .nazwa, .kraj, .rocznik {
                display: inline-flex;
                border-top: 1px solid black;
                background-color: white;
                border-bottom: 1px solid black;
                padding: 7px;
            }
            .numer {
                border-top-left-radius: 15px;
                border-bottom-left-radius: 15px;
                border-left: 1px solid black;
                background-color: gold;
                width: 40px;
                font-weight: bolder;
            }
            .nazwa { width: 100px; }
            .kraj { font-size: xx-small; width: 10px; }
            .rocznik { border-right: 1px solid black; }
            &:hover, &.selected {
                .nazwa, .kraj, .rocznik { background-color: #42b983; color: white; }
                .numer { background-color: darken(gold, 10%); color: white; }
            }
            .medal {
                display: inline-flex;
                width: 34px;
                height: 34px;
            }
        }
    }
}

.detail {
    display: flex;
}

</style>
