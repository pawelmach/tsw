import Vue from 'vue';
import './plugins/vuetify';
import Vuetify from 'vuetify/es5/index';
import VueSocketIO from 'vue-socket.io-extended';
import io from 'socket.io-client';
import App from './App.vue';
import router from './router';
import store from './store';
import 'vuetify/dist/vuetify.min.css';

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

console.log(window.location.hostname);
Vue.use(VueSocketIO, io(`http://${window.location.hostname}:3030`), { store });
Vue.use(Vuetify, {
    iconfont: 'md'
});
