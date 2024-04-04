const express = require('express');
const { Router } = require('express');
const UsersController = require('../controllers/UsersController');

const usersRoutes = Router();
const usersController = new UsersController();

usersRoutes.post('/create', usersController.create);
usersRoutes.post('/authenticate', usersController.authenticate); // Rota de autenticação

module.exports = usersRoutes;