import { createApp } from './app';

const statefulContext = window.__INITIAL_STATE__
? { state: window.__INITIAL_STATE__ }
 : { state: {} };

 const { app, router, store } = createApp(statefulContext);

import './assets/style.scss';

router.onReady(() => {
    app.$mount('#app');
});
