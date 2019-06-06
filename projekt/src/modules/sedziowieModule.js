import axios from 'axios';

const state = {
    sedziowie: []
};

const getters = {
    getJudgeById: state => {
        return (id) => {
            return state.sedziowie.find(j => j.id === id);
        };
    },
    paginatedJudges: state => {
        return (start, end) => {
            return state.sedziowie.slice(start, end);
        };
    },
    judgesCount: state => {
        return state.sedziowie.length;
    }
};

const actions = {
    fetchSedziowie: (context) => {
        let url = 'http://localhost:3000/';
        axios.get(url + 'sedziowie', { headers: { 'Access-Control-Allow-Origin': '*' } })
            .then(res => context.commit('FETCH_SEDZIOWIE', res.data));
    }
};

const mutations = {
    FETCH_SEDZIOWIE: (state, sedziowie) => {
        state.sedziowie = sedziowie;
    },
    nowySedzia: (state) => {
        state.sedziowie.push({ id: state.sedziowie.length + 1, sedzia: '', kraj: '' });
    }
};

export default {
    namespaced: false,
    state,
    getters,
    actions,
    mutations
};
