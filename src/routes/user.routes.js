const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UsersController');

const usersController = new UsersController();

router.post('/create', usersController.create);

module.exports = router;