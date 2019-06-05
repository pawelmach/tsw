import axios from 'axios';
import Vue from 'vue';

const state = {
    konie: []
};

const getters = {
    getHorseById: (state) => {
        return (id) => {
            return state.konie.find(kon => kon.id === id);
        };
    },
    filterKonie: (state) => {
        return (search, searchBy) => {
            return state.konie.filter(kon => {
                return kon[searchBy]
                    .toString()
                    .toLowerCase()
                    .includes(search.toLowerCase());
            });
        };
    },
    konieCount: (state) => {
        return state.konie.length;
    },
    sums: (state) => {
        return (id) => {
            let noty = state.konie.find(k => k.id === id).wynik.noty;
            console.log(noty);
            let sumaT = 0; let sumaG = 0; let sumaK = 0; let sumaN = 0; let sumaR = 0;
            let sumaSedzia = [];
            for (let n of noty) {
                sumaSedzia.push(n.typ + n.glowa + n.kloda + n.nogi + n.ruch);
                sumaT += n.typ;
                sumaG += n.glowa;
                sumaK += n.kloda;
                sumaN += n.nogi;
                sumaR += n.ruch;
            }
            console.log(sumaG);
            return {
                sumaSedzia: sumaSedzia,
                sumaT: sumaT,
                sumaG: sumaG,
                sumaK: sumaK,
                sumaN: sumaN,
                sumaR: sumaR
            };
        };
    }
};

const actions = {
    fetchKonie: (context) => {
        let url = 'http://localhost:3000/';
        axios.get(url + 'konie')
            .then(res => context.commit('FETCH_KONIE', res.data));
    }
};

const mutations = {
    FETCH_KONIE (state, konie) {
        state.konie = konie;
    },
    updateNumbers (state, kon) {
        let oldNumber = kon.oldNumber;
        kon = kon.kon;
        if (oldNumber > kon.numer) {
            state.konie
                .filter(h => h.numer >= kon.numer && h.id !== kon.id && h.numer < oldNumber)
                .forEach(h => {
                    Vue.set(state.konie[state.konie.findIndex(v => v.id === h.id)], 'numer', h.numer + 1);
                });
        } else if (oldNumber < kon.numer) {
            state.konie
                .filter(h => h.numer <= kon.numer && h.id !== kon.id && h.numer > oldNumber)
                .forEach(h => {
                    Vue.set(state.konie[state.konie.findIndex(v => v.id === h.id)], 'numer', h.numer - 1);
                });
        }
    }

};

export default {
    namespaced: false,
    state,
    getters,
    actions,
    mutations
};
