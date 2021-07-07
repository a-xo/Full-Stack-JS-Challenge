const express = require('express');

const { getAlbumsController } = require('../controllers/albums.controller');

const router = express.Router();

router.get('/albums', getAlbumsController);

module.exports = router;
