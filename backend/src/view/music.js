const express = require('express');

const { create, listAll, list } = require('../controller/music');

const router = express.Router();

router.get('/music', listAll);
router.get('/music/:id', list)
router.post('/music', create);

module.exports = router