const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const auth = require('../middlewares/auth');
const authorize = require('../middlewares/authorize');

//Rutas libres
router.get('/', auth, usersController.getUser);
router.get('/:id', auth, usersController.getUserById);

// Rutas requieren token y rol
router.post('/', auth, authorize('admin'), usersController.createUser);
router.put('/:id', auth, authorize('admin', 'edit'), usersController.updateUser);
router.delete('/:id', auth, authorize('admin'), usersController.deleteUser);

module.exports = router;
