const express = require('express');
const router = express.Router();
const controller = require('../controllers/OSController');

router.get('/', controller.fetchCollection);

module.exports = router;
