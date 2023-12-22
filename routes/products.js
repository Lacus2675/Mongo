
const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

// Establecer un prefijo común para todas las rutas relacionadas con productos
router.route('/products')
  .get(productController.index)
  .post(productController.create);

router.get('/products/new', productController.new);
router.get('/products/:id', productController.show);
router.get('/products/:id/edit', productController.edit);
router.put('/products/:id', productController.update);
router.delete('/products/:id', productController.delete);

module.exports = router;