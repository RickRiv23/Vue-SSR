import {Store} from 'vuex'

import api from '../api';

const actions = {
    getUsers: ({ commit }) =>{
        api.getUsers()
            .then(response => commit('setUsers', response.data));
    },
    getCollections: async ({ commit }) =>{
        const data = await api.getCollections()
            .then(response => {
                commit('setCollections', response);
            });
    }
};

const mutations = {
    setUsers: (state, users) => {
        state.users = users;
    },
    setCollections: (state, collections) => {
        state.collections = collections;
        console.log('Store collections', state.collections);
    }
};

const getters = {
    title: state => {
        return state.title
    },
    users: state => {
        return state.users
    }
};

const createStore = (state) => {
    return new Store({
        state,
        mutations,
        getters,
        actions,
        strict: process.env.NODE_ENV !== 'production',
    });
};

export default createStore;