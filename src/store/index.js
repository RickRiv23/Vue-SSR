import {Store} from 'vuex'
import app from './modules/app';
import auth from './modules/auth';

// import api from '../api';


const createStore = (state) => {
    return new Store({
      state,
      modules: {
        app,
        auth
      },
      strict: process.env.NODE_ENV !== 'production',
    });
};

export default createStore;
