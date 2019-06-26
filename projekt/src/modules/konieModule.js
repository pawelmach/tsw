import Vue from 'vue';

const state = {
    konie: [],
    headers: [
        { text: 'Numer', value: 'numer' },
        { text: 'Nazwa', value: 'nazwa' },
        { text: 'Rocznik', value: 'rocznik' },
        { text: 'Kraj', value: 'kraj' },
        { text: 'Klasa', value: 'klasa' },
        { text: 'Maść', value: 'masc' },
        { text: 'Płeć', value: 'plec' }
    ]
};

const getters = {
    getById: (state) => {
        return (id) => {
            return state.konie.find(kon => kon.id === id);
        };
    },
    getAll: (state) => {
        return state.konie;
    },
    search: (state) => {
        return (search, searchBy) => {
            return state.konie.filter(kon => {
                return kon[searchBy]
                    .toString()
                    .toLowerCase()
                    .includes(search.toLowerCase());
            });
        };
    },
    getKonieByKlasa: (state) => {
        return (klasaid) => {
            return state.konie.filter(kon => kon.klasa === klasaid);
        };
    },
    getHeaders: (state) => {
        return state.headers;
    }
};

const actions = {
    socket_ocenaKon ({ commit, getters }, kon) {
        commit('SOCKET_EDIT_KON', kon);
        let getKonie = getters.getKonieByKlasa;
        let konie = getKonie(kon.klasa);
        commit('UPDATE_MIEJSCA', konie);
    }

};

const mutations = {
    SOCKET_FETCH_KONIE (state, konie) {
        state.konie = konie;
    },
    SOCKET_NEW_KON (state, kon) {
        state.konie.push(kon);
    },
    SOCKET_EDIT_KON (state, kon) {
        let i = state.konie.findIndex(v => v.id === kon.id);
        Vue.set(state.konie, i, kon);
    },
    SOCKET_DELETE_KON (state, kon) {
        let i = state.konie.findIndex(v => v.id === kon.id);
        state.konie.splice(i, 1);
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
    UPDATE_MIEJSCA (state, konie) {
        // Vue.set(state.konie[state.konie.findIndex(v => v.id === kon.id)].wynik, 'noty', kon.wynik.noty);

        konie.sort((a, b) => {
            let k1 = a.wynik;
            let k2 = b.wynik;
            if (k1.punkty === k2.punkty && k1.sumT === k2.sumT && k1.sumR === k2.sumR) {
                if (k1.rozjemca === 1 && k2.rozjemca === 2) {
                    return -1;
                } else if (k1.rozjemca === 2 && k2.rozjemca === 1) {
                    return 1;
                }
                Vue.set(state.konie[state.konie.findIndex(v => v.id === a.id)].wynik, 'rozjemca', true);
                Vue.set(state.konie[state.konie.findIndex(v => v.id === b.id)].wynik, 'rozjemca', true);
                return 0;
            }
            if (
                k1.punkty > k2.punkty ||
                (k1.punkty === k2.punkty && k1.sumT > k2.sumT) ||
                (k1.punkty === k2.punkty && k1.sumT === k2.sumT && k1.sumR > k2.sumR)
            ) { return -1; } else { return 1; }
        });

        konie.forEach((k, i) => {
            let idx = state.konie.findIndex(v => v.id === k.id);
            Vue.set(state.konie[idx].wynik, 'miejsce', i + 1);
        });
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
