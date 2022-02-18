import {Store} from 'vuex'

import api from '../api';
const state = {
    isLoggedIn: false,
};

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
    },
    updateSpotifyAuth: ({ commit }, tokenData) => {
      if(tokenData){
        commit('spotifyLoginSuccess', tokenData);
      }
    },
    logout: ({ commit }) => {
        commit('logout');
    }
};

const mutations = {
    setUsers: (state, users) => {
        state.users = users;
    },
    setCollections: (state, collections) => {
        state.collections = collections;
        console.log('Store collections', state.collections);
    },
    spotifyLoginSuccess: (state, payload) => {
        state.spotifyAuth = payload;
        state.isLoggedIn = true;
    },
    logout: (state) => {
        state.isLoggedIn = false;
        state.spotifyAuth = null;
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
