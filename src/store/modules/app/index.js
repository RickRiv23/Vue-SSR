import api from '../../../api';

const state = {
    isLoggedIn: false,
    users: [],
    title: 'Vue SSR Demo',
    collections: [],
};

const actions = {
    getUsers: async ({ commit }) =>{
        await api.getUsers()
            .then(response => commit('setUsers', response.data));
    },
    getCollections: async ({ commit }) =>{
        const data = await api.getCollections()
            .then(response => {
                commit('setCollections', response);
            });
    },
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

const appStore = {
  // namespaced: true,
  state,
  actions,
  mutations,
  getters
};

export default appStore;
