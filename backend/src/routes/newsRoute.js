//import trimRequest from 'trim-request'
const express = require('express')
const router = express.Router()

const newsController = require('../services/news/controller/newsController')
const { verifyJWT } = require('../services/auth/controller/authController');

router.get('/',verifyJWT, newsController.getList);

router.get('/:id',verifyJWT, newsController.getById);

router.post('/',verifyJWT, newsController.add);

router.put('/:id',verifyJWT, newsController.edit);

router.delete('/:id',verifyJWT, newsController.delete);

module.exports = router;