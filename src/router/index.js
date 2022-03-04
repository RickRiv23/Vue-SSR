import Vue from 'vue';
import Router from 'vue-router';
import Spotify from '../views/spotify/index.vue';
import Home from '../views/home/index.vue';

Vue.use(Router);

export function createRouter () {
    return new Router({
        mode: 'history',
        routes: [
            {
                path: '/',
                component: Home,
                name: 'home'
            },
            {
                path: '/spotify',
                component: Spotify,
                name: 'spotify'
            },
        ]
    });
};
