import Vue from 'vue';

const state = {
    sedziowie: [],
    headers: [
        { text: 'Sędzia', value: 'sedzia' },
        { text: 'Kraj', value: 'kraj' }
    ]
};

const getters = {
    getById: (state) => {
        return (id) => {
            return state.sedziowie.find(j => j.id === id);
        };
    },
    getAll: (state) => {
        return state.sedziowie;
    },
    getHeadersLength: (state) => {
        return state.headers.length;
    },
    filterById: (state) => {
        return (ids) => {
            return state.sedziowie.filter(v => ids.includes(v.id));
        };
    },
    getHeaders: (state) => {
        return state.headers;
    },
    search: (state) => {
        return (search, searchBy) => {
            return state.sedziowie.filter(sedzia => {
                return sedzia[searchBy]
                    .toString()
                    .toLowerCase()
                    .includes(search.toLowerCase());
            });
        };
    }
};

const actions = {

};

const mutations = {
    SOCKET_NEW_SEDZIA (state, sedzia) {
        state.sedziowie.push(sedzia);
    },
    SOCKET_FETCH_SEDZIOWIE (state, sedziowie) {
        state.sedziowie = sedziowie;
    },
    SOCKET_EDIT_SEDZIA (state, sedzia) {
        let i = state.sedziowie.findIndex(v => v.id === sedzia.id);
        Vue.set(state.sedziowie, i, sedzia);
    },
    SOCKET_DELETE_SEDZIA (state, sedzia) {
        let i = state.sedziowie.findIndex(v => v.id === sedzia.id);
        state.sedziowie.splice(i, 1);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
