<template>
    <div class="ocenianie">
        <div class="infokon">
            <span class="numer">{{kon.numer}}</span>
            <span class="nazwa">{{kon.nazwa}}</span>
            <span class="kraj">{{kon.kraj}}</span>
            <span class="rocznik">{{kon.rocznik}}</span>
            <span class="masc">{{kon.masc}}</span>
        </div>

        <table>
            <tr>
                <th></th>
                <th>Typ</th>
                <th>Głowa</th>
                <th>Kłoda</th>
                <th>Nogi</th>
                <th>Ruch</th>
            </tr>
            <tr v-for="n in sedziowie.length"
                :key="n"
            >
                <td>{{sedziowie[n-1].sedzia}}</td>
                <td><input v-model.number="kon.wynik.noty[n-1].typ" type="number" step="0.5" :tabindex="n" min="0" max="20"></td>
                <td><input v-model.number="kon.wynik.noty[n-1].glowa" type="number" step="0.5" :tabindex="n+sedziowie.length" min="0" max="20"></td>
                <td><input v-model.number="kon.wynik.noty[n-1].kloda" type="number" step="0.5" :tabindex="n+sedziowie.length*2" min="0" max="20"></td>
                <td><input v-model.number="kon.wynik.noty[n-1].nogi" type="number" step="0.5" :tabindex="n+sedziowie.length*3" min="0" max="20"></td>
                <td><input v-model.number="kon.wynik.noty[n-1].ruch" type="number" step="0.5" :tabindex="n+sedziowie.length*4" min="0" max="20"></td>
                <td>{{sumy.sumaSedzia[n-1]}}</td>
            </tr>
            <tr>
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
            };
        },
        props: ['konid', 'klasaid'],
        watch: {
            kon (newVal, oldVal) {
                // sumy();
            }
        },
        computed: {
            ...mapGetters(['getClassById', 'getHorseById', 'sums']),
            kon () {
                return this.getHorseById(this.konid);
            },
            sedziowie () {
                return this.getClassById(this.klasaid).komisja;
            },
            sumy () {
                return this.sums(this.konid);
            }
        }
    };
</script>

<style lang="less">

</style>
