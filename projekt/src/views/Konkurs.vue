<template>
    <div class="konkurs">
        <div id="nav">
            <router-link to="/konkurs/konie">Konie</router-link> |
            <router-link to="/konkurs/klasy">Klasy</router-link> |
            <router-link to="/konkurs/sedziowie">Sędziowie</router-link>
        </div>
        <div class="output">
            <router-view
                @konSelected="showKonDetail($event)"
                @klasaSelected="showKlasaDetail($event)"
                :mode="true"
            >
            </router-view>
        </div>
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
.all{
    display: flex;
    flex-direction: row;
}
</style>
