<template>
    <div class="horseDetail">
        <input type="button" @click="edit" :value="editable ? 'End editing' : 'Edit'"/>
        <table v-if="kon">
            <tr>
                <th>Numer</th>
                <td><input v-model.number="kon.numer" :disabled="!editable"></td>
            </tr>
            <tr>
                <th>Klasa</th>
                <td><input v-model="kon.klasa" :disabled="!editable"/></td>
            </tr>
            <tr>
                <th>Nazwa</th>
                <td><input v-model="kon.nazwa" :disabled="!editable"/></td>
            </tr>
            <tr>
                <th>Kraj</th>
                <td><input v-model="kon.kraj" :disabled="!editable"/></td>
            </tr>
            <tr>
                <th>Rocznik</th>
                <td><input v-model="kon.rocznik" :disabled="!editable"/></td>
            </tr>
            <tr>
                <th>Maść</th>
                <td><input v-model="kon.masc" :disabled="!editable"/></td>
            </tr>
            <tr>
                <th>Płeć</th>
                <td><input v-model="kon.plec" :disabled="!editable"/></td>
            </tr>
            <tr>
                <th rowspan="2">Hodowca</th>
                <td><input v-model="kon.hodowca.nazwa" :disabled="!editable"/></td>
            </tr>
            <tr>
                <td><input v-model="kon.hodowca.kraj" :disabled="!editable"/></td>
            </tr>
            <tr>
                <th rowspan="3">Rodowód</th>
                <th>Ojciec</th>
                <td><input v-model="kon.rodowod.o.nazwa" :disabled="!editable"/></td>
                <td><input v-model="kon.rodowod.o.kraj" :disabled="!editable"/></td>
            </tr>
            <tr>
                <th>Matka</th>
                <td><input v-model="kon.rodowod.m.nazwa" :disabled="!editable"/></td>
                <td><input v-model="kon.rodowod.m.kraj" :disabled="!editable"/></td>
            </tr>
            <tr>
                <th>Ojciec matki</th>
                <td><input v-model="kon.rodowod.om.nazwa" :disabled="!editable"/></td>
                <td><input v-model="kon.rodowod.om.kraj" :disabled="!editable"/></td>
            </tr>

        </table>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        name: 'HorseDetail',
        props: ['id'],
        data () {
            return {
                editable: false,
                oldNumber: Number
            };
        },
        computed: {
            ...mapGetters(['getHorseById']),
            kon () {
                return this.getHorseById(this.id);
            }
        },
        methods: {
            edit: function () {
                if (this.editable) {
                    this.editable = false;
                    this.$store.commit('updateNumbers', { kon: this.kon, oldNumber: this.oldNumber });
                    // swap whole kon object for number
                } else {
                    this.editable = true;
                    this.oldNumber = this.kon.numer;
                }
            }
        }
    };
</script>

<style lang="less">
.horseDetail{
    display: flexbox;
    flex-direction: row;

    border: 1px solid black;
    table {
        td, th {
            border: 1px solid black;
        }
    }
    input {
        &:disabled {
            color: black;
            background-color: white;

            opacity: 100%;
        }
    }
}
</style>
