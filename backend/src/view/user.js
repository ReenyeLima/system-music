const express = require('express');

const { create, listAll, list, login } = require('../controller/user');

const router = express.Router();

router.get('/user', listAll);
router.get('/user/:id', list);
router.post('/auth', login);
router.post('/user', create);

module.exports = router