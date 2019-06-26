<template>
    <div>
        <v-toolbar color="accent" flat>
            <v-toolbar-title v-if="kon">
                {{ kon.nazwa }}
            </v-toolbar-title>
        </v-toolbar>

        <v-data-table
            :headers="headers"
            :items="sedziowie"
            class="elevation-1"
            hide-actions
            disable-initial-sort
        >
            <template v-slot:items="props">
                <td>{{props.item.sedzia}}</td>
                <td>
                    <v-text-field
                        v-model.number="props.item.nota.typ"
                        type="number"
                        step="0.5"
                        :tabindex="props.index+1"
                        min="0"
                        max="20"
                        @input="count(props.index, props.item.nota)"
                    />
                </td>
                <td>
                    <v-text-field
                        v-model.number="props.item.nota.glowa"
                        type="number"
                        step="0.5"
                        :tabindex="props.index+sedziowie.length"
                        min="0"
                        max="20"
                        @input="count(props.index, props.item.nota)"
                    />
                </td>
                <td>
                    <v-text-field
                        v-model.number="props.item.nota.kloda"
                        type="number"
                        step="0.5"
                        :tabindex="props.index+sedziowie.length*2"
                        min="0"
                        max="20"
                        @input="count(props.index, props.item.nota)"
                    />
                </td>
                <td>
                    <v-text-field
                        v-model.number="props.item.nota.nogi"
                        type="number"
                        step="0.5"
                        :tabindex="props.index+sedziowie.length*3"
                        min="0"
                        max="20"
                        @input="count(props.index, props.item.nota)"
                    />
                </td>
                <td>
                    <v-text-field
                        v-model.number="props.item.nota.ruch"
                        type="number"
                        step="0.5"
                        :tabindex="props.index+sedziowie.length*4"
                        min="0"
                        max="20"
                        @input="count(props.index, props.item.nota)"
                    />
                </td>
                <td>
                    {{props.item.nota.suma || 0}}
                </td>
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
        props: ['klasaid', 'konid'],
        computed: {
            ...mapGetters('konie', { getKon: 'getById' }),
            ...mapGetters('klasy', { getKlasa: 'getById' }),
            ...mapGetters('sedziowie', { getSedzia: 'filterById' }),
            kon () {
                return this.getKon(this.konid);
            },
            klasa () {
                return this.getKlasa(this.klasaid);
            },
            sedziowie () {
                if (this.klasa && this.kon) {
                    let sedziowie = this.getSedzia(this.klasa.komisja);
                    sedziowie.forEach((s, i) => {
                        s.nota = this.kon.wynik.noty[i];
                    });
                    return sedziowie;
                }
                return [];
            }
        },
        methods: {
            count (i, nota) {
                nota.suma = nota.typ + nota.glowa + nota.nogi + nota.kloda + nota.ruch;
                this.kon.wynik.noty[i] = nota;
                this.kon.wynik.sumT = 0;
                this.kon.wynik.sumG = 0;
                this.kon.wynik.sumN = 0;
                this.kon.wynik.sumK = 0;
                this.kon.wynik.sumR = 0;
                this.kon.wynik.noty.forEach(v => {
                    this.kon.wynik.sumT += v.typ;
                    this.kon.wynik.sumG += v.glowa;
                    this.kon.wynik.sumN += v.nogi;
                    this.kon.wynik.sumK += v.kloda;
                    this.kon.wynik.sumR += v.ruch;
                });
                this.kon.wynik.punkty = this.kon.wynik.sumT + this.kon.wynik.sumG + this.kon.wynik.sumN + this.kon.wynik.sumK + this.kon.wynik.sumR;
                this.$socket.emit('kon ocena', this.kon);
            }
        }
    };
</script>

<style>

</style>
