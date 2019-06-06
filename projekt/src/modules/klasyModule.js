import axios from 'axios';
// import Vue from 'vue';

const state = {
    klasy: []
};

const getters = {
    getClassById (state, getters, rootState, rootGetters) {
        return (id) => {
            return state.klasy.find(klasa => klasa.id === id);
        };
    },
    getSedziowie (state, getters, rootState, rootGetters) {
        return (id) => {
            return state.klasy.find(klasa => klasa.id === id).komisja.map(k => { return rootState.sedziowie.sedziowie.find(s => s.id === k); });
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
    },
    getHorsesInKlasa (state, getters, rootState, rootGetters) {
        return (id) => {
            return rootState.konie.konie.filter(k => k.klasa === id);
        };
    }
};

const actions = {
    fetchKlasy (context) {
        let url = 'http://localhost:3000/';
        axios.get(url + 'klasy')
            .then(res => context.commit('FETCH_KLASY', res.data));
    },
    deleteKlasa (context, payload) {
        context.commit('DELETE_KLASA', payload);
    },
    createKlasa (context, payload) {
        context.commit('CREATE_KLASA', payload);
    }
};

const mutations = {
    FETCH_KLASY (state, klasy) {
        state.klasy = klasy;
    },
    DELETE_KLASA (state, id) {
        state.klasy.splice(state.klasy.findIndex(v => v.id === id), 1);
    },
    CREATE_KLASA (state, klasa) {
        state.klasy.push(klasa);
    }
};

export default {
    namespaced: false,
    state,
    getters,
    actions,
    mutations
};
