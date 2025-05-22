const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.controller');
const auth = require('../middlewares/auth');
const authorize = require('../middlewares/authorize');

//Rutas libres
router.get('/', auth, productsController.getProduct);
router.get('/:id', auth, productsController.getProductById);

// Rutas requieren token y rol
router.post('/', auth, authorize('admin'), productsController.createProduct);
router.put('/:id', auth, authorize('admin', 'edit'), productsController.updateProduct);
router.delete('/:id', auth, authorize('admin'), productsController.deleteProduct);

module.exports = router;
