//import trimRequest from 'trim-request'
const express = require('express')
const router = express.Router()

const newsController = require('../services/news/controllers/newsController')

router.get('/', newsController.getList);

router.get('/:id', newsController.getById);

router.post('/', newsController.add);

router.put('/:id', newsController.edit);

router.delete('/:id', newsController.delete);

module.exports = router;