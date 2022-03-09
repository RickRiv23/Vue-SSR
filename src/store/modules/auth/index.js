import api from '../../../api';

const initialState = {
  accessToken: "",
  refreshToken: "",
  expiryTime: ""
};

const state = initialState;

const actions = {
  login: async function() {
    try {
      const response = await api.spotifyLogin();
      if (response.data) {
        window.location.href = response.data;
      }
    } catch (e) {
      console.log(e);
    }
  },

  refreshToken: async function({ commit, state, dispatch }) {
    try {
      if (state.refreshToken) {
        const response = await api.auth.refreshToken(state.refreshToken);
        commit("SET_ACCESS_TOKEN", response.data.access_token);

        const accessToken = response.data.access_token;

        dispatch("setAccessToken", accessToken);
        return response;
      }
    } catch (e) {
      console.log(e);
    }
  },

  logout: ({ commit }) => {
    // let script = document.createElement("script");

    // script.src = "https://www.spotify.com/logout/";
    // document.getElementById("app").appendChild(script);

    commit("LOGOUT");

    window.localStorage.clear();
    window.sessionStorage.clear();

    setTimeout(() => {
      location.reload();
    }, 1000);
  },

  initializeAuthData: ({ commit }) => {
    const tokenData = localStorage.getItem("tokenData") || null;
    if(tokenData) {
      const data = JSON.parse(tokenData);
      commit("SET_AUTH_DATA", data);
    }
  },

  setAuthData({ commit }, data) {
    commit("SET_AUTH_DATA", data);
  },

  // setAccessToken({ commit }, token) {
  //   commit("SET_ACCESS_TOKEN", token);
  // },

  // setRefreshToken({ commit }, token) {
  //   commit("SET_REFRESH_TOKEN", token);
  // },

  // setExpiryTime({ commit }, time) {
  //   commit("SET_EXPIRY_TIME", time);
  // }
};

const mutations = {
  // SET_ACCESS_TOKEN(state, token) {
  //   state.accessToken = token;
  // },

  // SET_REFRESH_TOKEN(state, token) {
  //   state.refreshToken = token;
  // },

  // SET_EXPIRY_TIME(state, time) {
  //   state.expiryTime = time;
  // },

  SET_AUTH_DATA(state, data) {
    state.accessToken = data.access_token;
    state.refreshToken = data.refresh_token;
    state.expiryTime = data.expires_in;
    localStorage.setItem("tokenData", JSON.stringify(data));
  },

  LOGOUT(state) {
    state = initialState;
  }
};

const getters = {
  getAccessToken: state => state.accessToken,
  getRefreshToken: state => state.refreshToken,
  getExpiryTime: state => state.expiryTime,
  isLoggedIn: state => {
    return (state.accessToken && state.refreshToken && state.expiryTime) ? true : false;
  }
};

const authStore =  {
  state,
  mutations,
  getters,
  actions
};

export default authStore;
