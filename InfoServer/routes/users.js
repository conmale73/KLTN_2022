const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// GET /api/users
router.get('/', usersController.getUsers);

// GET /api/users/:id
router.get('/:id', usersController.getUser);

// POST /api/users
router.post('/', usersController.createUser);

// PUT /api/users/:id
router.put('/:id', usersController.updateUser);

// DELETE /api/users/:id
router.delete('/:id', usersController.deleteUser);

// POST /api/login
router.post('/login', usersController.login);

// POST /api/logout
router.post('/logout', usersController.logout);

module.exports = router;