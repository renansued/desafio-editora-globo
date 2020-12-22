//import trimRequest from 'trim-request'
const express = require('express')
const router = express.Router()

const usersController = require('../services/user/controller/userController')

router.get('/all', usersController.getList);

router.get('/:id', usersController.getById);

router.post('/adicionar', usersController.add);

router.put('/editar/:id', usersController.edit);

router.delete('/delete/:id', usersController.delete);

module.exports = router;