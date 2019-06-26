<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs5>
                <v-card>
                    <v-form>
                        <v-container fluid>
                            <v-layout column>

                                <v-text-field
                                    placeholder="Login"
                                    v-model="username"
                                ></v-text-field>

                                <v-text-field
                                    v-model="password"
                                    min="4"
                                    required
                                    placeholder="Password"
                                    type="password"
                                ></v-text-field>

                                <v-btn @click="login()">
                                    Log in
                                </v-btn>

                            </v-layout>
                        </v-container>
                    </v-form>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data () {
            return {
                username: '',
                password: ''
            };
        },
        methods: {
            login () {
                this.$socket.emit('authentication', { username: this.username, password: this.password });
                this.$router.push({ path: '/' });
            }
        }
    };
</script>

<style>

</style>
