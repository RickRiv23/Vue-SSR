const express = require('express');
const router = express.Router();
const controller = require('../controllers/SpotifyController');

router.get('/login', controller.login);
router.get('/callback', controller.callback);

module.exports = router;
