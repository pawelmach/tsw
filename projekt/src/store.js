import Vue from 'vue';
import Vuex from 'vuex';
import konieModule from './modules/konieModule';
import klasyModule from './modules/klasyModule';
import sedziowieModule from './modules/sedziowieModule';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        konie: konieModule,
        klasy: klasyModule,
        sedziowie: sedziowieModule
    },
    actions: {
        fetchData () {
            this.dispatch('fetchKonie');
            this.dispatch('fetchKlasy');
            this.dispatch('fetchSedziowie');
        }
    }
});
