const express = require('express');
const {isLoggedIn, isAdmin} = require('../validation/authValidator')
const uploader = require('../middlewares/multerMiddleware');
const { addProduct, getProduct, deleteProduct } = require('../controller/productController');

const productRouter = express.Router();

productRouter.post('/', isLoggedIn, isAdmin, uploader.single('productImage'), addProduct);
productRouter.get('/:id', getProduct);
productRouter.delete('/:id', deleteProduct)

module.exports = productRouter