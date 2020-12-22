const trimRequest = require('trim-request')
const express = require('express')
const router = express.Router()

const usersController = require('../services/user/controller/userController');
const { verifyJWT,authenticate,logout } = require('../services/auth/controller/authController');

router.post('/login',trimRequest.all, authenticate);

router.post('/logout', trimRequest.all, verifyJWT, logout);

router.get('/', trimRequest.all, verifyJWT, usersController.getList);

router.get('/:id', trimRequest.all, verifyJWT, usersController.getById);

router.post('/adicionar', trimRequest.all, verifyJWT, usersController.add);

router.put('/editar/:id', trimRequest.all, verifyJWT, usersController.edit);

router.delete('/delete/:id', trimRequest.all, verifyJWT, usersController.delete);

module.exports = router;