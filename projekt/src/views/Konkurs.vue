<template>
    <div class="konkurs">
        <div id="nav">
            <router-link to="/konkurs/konie">Konie</router-link> |
            <router-link to="/konkurs/klasy">Klasy</router-link> |
            <router-link to="/konkurs/sedziowie">Sędziowie</router-link>
        </div>
        <router-view
            @konSelected="showKonDetail($event)"
            @klasaSelected="showKlasaDetail($event)"
        >
        </router-view>
    </div>
</template>

<script>
    export default {
        methods: {
            showKonDetail (id) {
                this.$router.push({ path: `/konkurs/konie/${id}` });
            },
            showKlasaDetail (id) {
                this.$router.push({ path: `/konkurs/klasy/${id}` });
            }
        }
    };
</script>

<style>

</style>
