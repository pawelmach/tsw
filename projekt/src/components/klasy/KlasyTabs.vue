<template>
    <div>
        <v-tabs
            dark
            color="primary"
            show-arrows
        >
            <v-tabs-slider color="accent"></v-tabs-slider>
            <v-tab
                v-for="k in klasy"
                :key="k.id"
                :to="'/paneloceniania/'+k.id"
            >
                Klasa {{ k.numer }}
            </v-tab>
        </v-tabs>
        <router-view></router-view>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
        computed: {
            ...mapState('klasy', ['klasy'])
        }
    };
</script>

<style>

</style>
