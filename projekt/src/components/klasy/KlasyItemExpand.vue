<template>
    <v-card raised>
        <v-card-title>Sędziowie</v-card-title>
        <v-card-text>
            <v-chip
                v-for="(item, index) in komisja"
                :key="index"
            >
                {{item.sedzia}}
            </v-chip>
        </v-card-text>
        <!-- <v-divider></v-divider> -->
    </v-card>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        props: ['props'],
        computed: {
            ...mapGetters('sedziowie', ['filterById']),
            komisja () {
                return this.filterById(this.props.item.komisja);
            }
        }
    };
</script>
