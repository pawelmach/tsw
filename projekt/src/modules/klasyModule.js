import Vue from 'vue';

const state = {
    klasy: [],
    headers: [
        { text: 'Numer', value: 'numer' },
        { text: 'Kategoria', value: 'kat' }
    ]
};

const getters = {
    getById: (state) => {
        return (id) => {
            return state.klasy.find(klasa => klasa.id === id);
        };
    },
    getAll: (state) => {
        return state.klasy;
    },
    search: (state) => {
        return (search, searchBy) => {
            return state.klasy.filter(klasa => {
                return klasa[searchBy]
                    .toString()
                    .toLowerCase()
                    .includes(search.toLowerCase());
            });
        };
    },
    getHeaders: (state) => {
        return state.headers;
    },
    getHeadersLength: (state) => {
        return state.headers.length;
    },
    getLength: (state) => {
        return state.klasy.length;
    }
};

const actions = {
    add (context, payload) {
        context.commit('ADD_KLASA', payload);
    },
    edit (context, payload) {
        context.commit('EDIT_KLASA', payload);
    }
};

const mutations = {
    SOCKET_FETCH_KLASY (state, klasy) {
        state.klasy = klasy;
    },
    SOCKET_NEW_KLASA (state, klasa) {
        state.klasy.push(klasa);
    },
    SOCKET_EDIT_KLASA (state, klasa) {
        let i = state.klasy.findIndex(v => v.id === klasa.id);
        Vue.set(state.klasy, i, klasa);
    },
    SOCKET_DELETE_KLASA (state, klasa) {
        let i = state.klasy.findIndex(v => v.id === klasa.id);
        state.klasy.splice(i, 1);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
