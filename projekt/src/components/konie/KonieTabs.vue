<template>
    <div>
        <v-tabs
            dark
            color="primary"
            show-arrows
        >
            <v-tab
                v-for="k in konie"
                :key="k.id"
                :to="'/paneloceniania/'+klasaid+'/'+k.id"
            >

                {{ k.nazwa }}
            </v-tab>
            <v-tabs-slider color="accent"></v-tabs-slider>

        </v-tabs>

        <router-view></router-view>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        props: ['klasaid'],
        computed: {
            ...mapGetters('konie', ['getKonieByKlasa']),
            konie () {
                return this.getKonieByKlasa(this.klasaid);
            }
        }
    };
</script>

<style>

</style>
