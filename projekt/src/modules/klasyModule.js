import axios from 'axios';

const state = {
    klasy: []
};

const getters = {
    getClassById (state, getters, rootState, rootGetters) {
        return (id) => {
            let klasa = state.klasy.find(klasa => klasa.id === id);
            klasa.komisja = klasa.komisja.map(k => { return rootState.sedziowie.sedziowie.find(s => s.id === k); });
            return klasa;
        };
    },
    filterKlasy: (state) => {
        return (search, searchBy) => {
            return state.klasy.filter(klasa => {
                return klasa[searchBy]
                    .toString()
                    .toLowerCase()
                    .includes(search.toLowerCase());
            });
        };
    }
};

const actions = {
    fetchKlasy (context) {
        let url = 'http://localhost:3000/';
        axios.get(url + 'klasy')
            .then(res => context.commit('FETCH_KLASY', res.data));
    }
};

const mutations = {
    FETCH_KLASY (state, klasy) {
        state.klasy = klasy;
    }
};

export default {
    namespaced: false,
    state,
    getters,
    actions,
    mutations
};
