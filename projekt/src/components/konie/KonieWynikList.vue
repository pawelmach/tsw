<template>
    <div v-if="konie">
        <v-expansion-panel>
            <v-expansion-panel-content
                v-for="kon in konie"
                :key="kon.id"
            >
                <template v-slot:header>
                    <div>
                        {{kon.wynik.miejsce}}. {{kon.nazwa}} |
                        <span>
                            Punkty: {{kon.wynik.punkty}} |
                            Suma ruch: {{kon.wynik.sumR}} |
                            Suma typ: {{kon.wynik.sumT}}
                        </span>
                    </div>
                </template>
                <v-card>
                    <v-card-text>
                        <v-data-table
                            :headers="headers"
                            :items="sedziowie"
                            class="elevation-1"
                            hide-actions
                            disable-initial-sort
                        >
                            <template v-slot:items="props">
                                <td>{{props.item.sedzia}}</td>
                                <td>{{kon.wynik.noty[props.index].typ}}</td>
                                <td>{{kon.wynik.noty[props.index].glowa}}</td>
                                <td>{{kon.wynik.noty[props.index].kloda}}</td>
                                <td>{{kon.wynik.noty[props.index].nogi}}</td>
                                <td>{{kon.wynik.noty[props.index].ruch}}</td>
                                <td>{{kon.wynik.noty[props.index].suma || 0}}</td>
                            </template>

                            <template v-slot:footer v-if="kon">
                                <td>Sumy:</td>
                                <td>{{kon.wynik.sumT || 0}}</td>
                                <td>{{kon.wynik.sumG || 0}}</td>
                                <td>{{kon.wynik.sumK || 0}}</td>
                                <td>{{kon.wynik.sumN || 0}}</td>
                                <td>{{kon.wynik.sumR || 0}}</td>
                                <td>{{kon.wynik.punkty || 0}}</td>
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        data () {
            return {
                headers: [
                    { text: 'Sędzia', value: 'sedzia' },
                    { text: 'Typ', value: 'typ' },
                    { text: 'Głowa', value: 'glowa' },
                    { text: 'Kłoda', value: 'kloda' },
                    { text: 'Nogi', value: 'nogi' },
                    { text: 'Ruch', value: 'ruch' },
                    { text: 'Sumy', value: 'suma' }
                ]
            };
        },
        props: ['klasaid'],
        computed: {
            ...mapGetters('konie', ['getKonieByKlasa']),
            ...mapGetters('sedziowie', { getSedzia: 'filterById' }),
            ...mapGetters('klasy', { getKlasa: 'getById' }),
            konie () {
                let k = this.getKonieByKlasa(this.klasaid);
                k.sort((a, b) => a.wynik.miejsce - b.wynik.miejsce);
                return k;
            },
            klasa () {
                return this.getKlasa(this.klasaid);
            },
            sedziowie () {
                if (this.klasa && this.konie) {
                    let sedziowie = this.getSedzia(this.klasa.komisja);
                    return sedziowie;
                }
                return [];
            }
        }
    };
</script>

<style>

</style>
