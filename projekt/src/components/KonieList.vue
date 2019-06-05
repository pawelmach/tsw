<template>
    <div class="listakoni">
        <h2>Konie</h2>
        <div class="wyszukiwarka" v-if="mode === 'ocena'">
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
            <div class="kon" :class="{selected: selected === kon.id}" v-for="kon in filteredList" :key="kon.id" @click="clicked(kon.id)">
                <span class="numer">{{kon.numer}}</span>
                <span class="nazwa">{{kon.nazwa}}</span>
                <span class="kraj">{{kon.kraj}}</span>
                <span class="rocznik">{{kon.rocznik}}</span>
            </div>
        </div>
        <router-view></router-view>
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
            }
        },
        computed: {
            ...mapGetters(['filterKonie'])
        },
        methods: {
            filter () {
                if (this.mode === 'ocena') {
                    this.filteredList = this.filterKonie(this.klasaid.toString(), 'klasa');
                } else {
                    this.filteredList = this.filterKonie(this.search, this.searchBy.toLowerCase());
                }
            },
            clicked (id) {
                this.$emit('konSelected', id);
                this.selected = id;
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
    padding: 2px;
    border: 1px solid black;
    border-radius: 25px;
    max-height: 80vh;
    flex-direction: column;
    flex-flow: column;
    flex-wrap: nowrap;
    max-width: 305px;
    margin: 20px;
    display: flexbox;
    justify-items: center;
    background-image: linear-gradient(270deg, #42b983, white);
    h2{
        margin: 5px;
    }

    .wyszukiwarka {
        margin: 5px;
        span {
            font-size: x-small;
            color: gray;
        }
        input {
            border: 1px solid lightgray;
            border-radius: 10px;
            padding: 5px;
            color: darken(cornflowerblue, 25%);
        }
        select {
            border: 0px;
            appearance: none;
            background-color: transparent;
                color: cornflowerblue;
            &:hover{
                text-decoration: underline;
            }
            &:-moz-focusring {
                color: transparent;
                text-shadow: 0 0 0 cornflowerblue;
            }
            option {
                border: none;
            }
        }
    }

    .lista {
        max-height: 70vh;
        overflow-y: auto;
        padding-top: 10px;
        margin: 20px;
        margin-top: 5px;
        margin-bottom: 0px;

        .kon {
            padding: 2px;
            display: flex;
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
            .nazwa {
                width: 100px;
            }
            .kraj {
                font-size: xx-small;
                width: 10px;
            }
            .rocznik {
                border-right: 1px solid black;
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
