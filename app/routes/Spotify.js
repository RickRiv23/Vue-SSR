const express = require('express');
const router = express.Router();
const controller = require('../controllers/SpotifyController');

router.get('/login', controller.login);

module.exports = router;
