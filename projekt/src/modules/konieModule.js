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
    },
    deleteKon (context, payload) {
        context.commit('DELETE_KON', payload);
    }
};

const mutations = {
    FETCH_KONIE (state, konie) {
        state.konie = konie;
    },
    DELETE_KON (state, id) {
        state.konie.splice(state.konie.findIndex(v => v.id === id), 1);
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
    },
    updateWyniki (state, kon) {
        Vue.set(state.konie[state.konie.findIndex(v => v.id === kon.id)].wynik, 'noty', kon.wynik.noty);
        let konie = state.konie.filter(k => k.klasa === kon.klasa);
        konie.forEach(k => {
            let suma = 0; let sumaT = 0; let sumaR = 0;
            k.wynik.noty.forEach(n => {
                suma += n.typ + n.glowa + n.kloda + n.nogi + n.ruch;
                sumaT += n.typ;
                sumaR += n.typ;
            });
            k.wynik.suma = suma;
            k.wynik.st = sumaT;
            k.wynik.sr = sumaR;
            Vue.set(state.konie[state.konie.findIndex(v => v.id === k.id)].wynik, 'suma', k.wynik.suma);
            Vue.set(state.konie[state.konie.findIndex(v => v.id === k.id)].wynik, 'st', k.wynik.st);
            Vue.set(state.konie[state.konie.findIndex(v => v.id === k.id)].wynik, 'sr', k.wynik.sr);
        });
        konie.sort((a, b) => {
            let k1 = a.wynik;
            let k2 = b.wynik;
            if (k1.suma === k2.suma && k1.st === k2.st && k1.sr === k2.sr) {
                a.wynik.rozjemca = true;
                return 0;
            }
            if (
                k1.suma > k2.suma ||
                (k1.suma === k2.suma && k1.st > k2.st) ||
                (k1.suma === k2.suma && k1.st === k2.st && k1.sr > k2.sr)
            ) { return 1; } else { return -1; }
        });
        Vue.set(state.konie[state.konie.findIndex(v => v.id === konie[0].id)].wynik, 'miejsce', 1);
        Vue.set(state.konie[state.konie.findIndex(v => v.id === konie[1].id)].wynik, 'miejsce', 2);
        Vue.set(state.konie[state.konie.findIndex(v => v.id === konie[2].id)].wynik, 'miejsce', 3);
    }

};

export default {
    namespaced: false,
    state,
    getters,
    actions,
    mutations
};
