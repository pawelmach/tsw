<template>
    <div class="ocenianie">
        <div class="infokon">
            <h2>
                <span class="numer">{{kon.numer}}</span>
                <span class="nazwa">{{kon.nazwa}}</span>
                <span class="kraj">{{kon.kraj}}</span>
                <span class="rocznik">{{kon.rocznik}}</span>
                <span class="masc">{{kon.masc}}</span>
            </h2>
        </div>

        <table>
            <tr class="theader">
                <th></th>
                <th>Typ</th>
                <th>Głowa</th>
                <th>Kłoda</th>
                <th>Nogi</th>
                <th>Ruch</th>
            </tr>
            <tr v-for="(s, n) in sedziowie"
                :key="n"
                class="dane"
            >
                <td class="sedzia">{{s.sedzia}}</td>
                <td><input @change="setWynik()" v-model.number="kon.wynik.noty[n].typ" type="number" step="0.5" :tabindex="n" min="0" max="20"></td>
                <td><input @change="setWynik()" v-model.number="kon.wynik.noty[n].glowa" type="number" step="0.5" :tabindex="n+sedziowie.length" min="0" max="20"></td>
                <td><input @change="setWynik()" v-model.number="kon.wynik.noty[n].kloda" type="number" step="0.5" :tabindex="n+sedziowie.length*2" min="0" max="20"></td>
                <td><input @change="setWynik()" v-model.number="kon.wynik.noty[n].nogi" type="number" step="0.5" :tabindex="n+sedziowie.length*3" min="0" max="20"></td>
                <td><input @change="setWynik()" v-model.number="kon.wynik.noty[n].ruch" type="number" step="0.5" :tabindex="n+sedziowie.length*4" min="0" max="20"></td>
                <td>{{sumy.sumaSedzia[n]}}</td>
            </tr>
            <tr class="sumy">
                <td></td>
                <td>{{sumy.sumaT}}</td>
                <td>{{sumy.sumaG}}</td>
                <td>{{sumy.sumaK}}</td>
                <td>{{sumy.sumaN}}</td>
                <td>{{sumy.sumaR}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        data () {
            return {
                rozjemca: false,
                kid: Number
            };
        },
        props: ['konid', 'klasaid'],
        beforeMount () {
            this.kid = this.klasaid;
        },
        computed: {
            ...mapGetters(['getClassById', 'getHorseById', 'sums', 'getSedziowie']),
            kon () {
                return this.getHorseById(this.konid);
            },
            sedziowie () {
                return this.getSedziowie(this.klasaid);
            },
            sumy () {
                return this.sums(this.konid);
            }
        },
        methods: {
            setWynik () {
                this.$store.commit('updateWyniki', this.kon);
                this.$emit('nowyWynik');
                console.log('dup');
            }
        }
    };
</script>

<style lang="less">
    .ocenianie {
        border-radius: 25px;
        border: 1px solid black;
        padding: 2px;
        display: flex;
        flex-direction: column;
        .infokon {
            h2{
                margin: 5px;
                .numer, .kraj, .rocznik, .masc, .nazwa {
                    display: inline-flex;
                    border-top: 1px solid black;
                    border-bottom: 1px solid black;
                    padding: 2px;
                }
                .numer{
                    border-top-left-radius: 15px;
                    border-bottom-left-radius: 15px;
                    border-left: 1px solid black;
                    width: 40px;
                    padding-left: 10px;
                    border-right: 1px solid black;
                }
                .nazwa{
                    width: 100px;
                    padding-left: 10px;
                }
                .kraj {
                    font-size: x-small;
                }
            }
        }
        table {
            .theader{
                color: darkcyan;
            }
            td{
                margin: 1px;
            }
            .dane {
                .sedzia {
                    background-color: darkslateblue;
                    color: white;
                    padding-left: 4px;
                    padding-right: 4px;
                }
                td input {
                    width: 50px;
                    appearance: text;
                    &{background-color: white;}
                }
                td{
                    background-color: chocolate;
                    color: white;
                }
            }
            .sumy{
                td{
                    empty-cells: hide;
                    margin: 1px;
                    background-color: chocolate;
                    color: white;
                }
            }
        }
    }
</style>
