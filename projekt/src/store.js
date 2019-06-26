import Vue from 'vue';
import Vuex from 'vuex';
import konieModule from './modules/konieModule';
import klasyModule from './modules/klasyModule';
import sedziowieModule from './modules/sedziowieModule';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isConnected: false,
        username: 'guest'
    },
    modules: {
        konie: konieModule,
        klasy: klasyModule,
        sedziowie: sedziowieModule
    },
    getters: {
        isGuest (state) {
            return state.username === 'guest';
        }
    },
    mutations: {
        SOCKET_CONNECT (state, status) {
            state.isConnected = true;
            this._vm.$socket.emit('authentication', { username: 'guest', password: 'guest' });
            console.log('Connected');
        },
        SOCKET_DISCONNECT (state, status) {
            state.isConnected = false;
            console.log('Disconnected');
        },
        SOCKET_AUTHENTICATED (state, user) {
            state.username = user;
            this._vm.$socket.emit('fetch klasy');
            this._vm.$socket.emit('fetch konie');
            this._vm.$socket.emit('fetch sedziowie');
        }
    }
});
