<template>
    <v-layout row nowrap>
        <v-flex>
            <router-link to="/panelkibica" v-if="!isGuest">
                <v-btn flat>
                    Panel Kibica
                </v-btn>
            </router-link>
        </v-flex>

        <v-flex>
            <router-link to="/paneloceniania" v-if="!isGuest">
                <v-btn flat>
                    Panel Oceniania
                </v-btn>
            </router-link>
        </v-flex>
        <v-flex>
            <v-menu offset-y v-if="!isGuest">
                <template v-slot:activator="{on}">
                    <v-btn flat v-on="on">
                        Konkurs
                    </v-btn>
                </template>
                <v-list>
                    <router-link
                        v-for="(item, i) in konkursList"
                        :key="i"
                        :to="item.link"
                    >
                        <v-btn flat>
                            {{item.title}}
                        </v-btn>
                    </router-link>
                    <v-btn @click="$socket.emit('newRandom')">
                        Nowe losowe dane
                    </v-btn>
                </v-list>
            </v-menu>
        </v-flex>
        <v-flex>

            <router-link to="/login" v-if="isGuest">
                <v-btn flat>
                    Zaloguj
                </v-btn>
            </router-link>
        </v-flex>
        <v-flex>

            <span>
                <v-btn flat
                       @click="logout()"
                       v-if="!isGuest"
                >
                    Wyloguj
                </v-btn>
            </span>
        </v-flex>
    </v-layout>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        data () {
            return {
                konkursList: [
                    { title: 'Konie', link: '/konkurs/konie' },
                    { title: 'Klasy', link: '/konkurs/klasy' },
                    { title: 'Sędziowie', link: '/konkurs/sedziowie' }
                ]
            };
        },
        computed: {
            ...mapGetters(['isGuest'])
        },
        methods: {
            logout () {
                this.$socket.emit('authentication', { username: 'guest', password: 'guest' });
                this.$router.push({ path: '/' });
            }
        }
    };
</script>

<style lang="less">
v-layout {
    justify-content: flex-end;
}
</style>
