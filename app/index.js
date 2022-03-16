const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const vueServerRenderer = require('vue-server-renderer');
const setupDevServer = require('../config/setup-dev-server');
require('dotenv').config();


const app = express();
app.use(cors());

const createRenderer = (bundle) =>
    vueServerRenderer.createBundleRenderer(bundle, {
        runInNewContext: false,
        template: fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')
    });
let renderer;

// Might want to serve static files using CDN in production
app.use('/public',  express.static(path.resolve(__dirname, '../dist')));

if (process.env.NODE_ENV === 'development') {
    setupDevServer(app, (serverBundle) => {
        renderer = createRenderer(serverBundle);
    });
} else {
    renderer = createRenderer(require('../dist/vue-ssr-server-bundle.json'));
}

//  Settting up api routing
const openSea = require('./routes/OpenSea');
app.use('/api/opensea', openSea);

const spotify = require('./routes/Spotify');
app.use('/api/spotify', spotify);

app.get('/', async (req, res) => {
    const context = {
        url: req.params['0'] || '/',
        state: {
          // app: {
            // title: 'Vue SSR Demo',
            // users: []
          // }
        }
    };
    let html;

    try {
        html = await renderer.renderToString(context);
    } catch (error) {
        if (error.code === 404) {
            return res.status(404).send('404 | Page Not Found');
        }
        console.log(error);
        return res.status(500).send('500 | Internal Server Error');
    }

    res.end(html);
});

// Example endpoint for 'serverPrefetch' demonstration
app.get('/users', (req, res) => {
    res.json([
      {
            name: 'Rick',
            lastname: 'Rivera'
        }, {
            name: 'Jessica ',
            lastname: 'Rice'
        }, {
            name: 'Tyrone',
            lastname: 'Hardenstein'
        }]
    );
});

module.exports = app;
