<template>
    <v-app>
        <v-toolbar app row>
            <v-toolbar-title class="headline text-uppercase">
                <span>Konkurs Koni</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <Nav/>
        </v-toolbar>

        <v-content>
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>
    import Nav from '@/components/Nav.vue';
    export default {
        name: 'App',
        components: { Nav }
    };
</script>
