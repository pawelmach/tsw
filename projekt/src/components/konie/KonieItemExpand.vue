<template>
    <v-layout nowrap row>
        <v-flex>
            <v-card>
                <v-card-title>Właściciel</v-card-title>
                <v-card-text>
                    {{props.item.wlasciciel.nazwa}}
                    <v-chip>{{props.item.wlasciciel.kraj}}</v-chip>
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex>
            <v-card>
                <v-card-title>Hodowca</v-card-title>
                <v-card-text>
                    {{props.item.hodowca.nazwa}}
                    <v-chip>{{props.item.hodowca.kraj}}</v-chip>
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex>
            <v-card>
                <v-card-title>Rodowód</v-card-title>
                <v-card-text>
                    <p>
                        Ojciec: {{props.item.rodowod.o.nazwa}}
                        <v-chip>{{props.item.rodowod.o.kraj}}</v-chip>
                    </p>
                    <p>
                        Matka: {{props.item.rodowod.m.nazwa}}
                        <v-chip>{{props.item.rodowod.m.kraj}}</v-chip>
                    </p>
                    <p>
                        Ojciec matki: {{props.item.rodowod.om.nazwa}}
                        <v-chip>{{props.item.rodowod.om.kraj}}</v-chip>
                    </p>
                </v-card-text>
            </v-card>
        </v-flex>
        <v-divider></v-divider>
    </v-layout>
</template>

<script>
    export default {
        props: ['props']
    };
</script>
