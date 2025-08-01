const express = require('express');
const {isLoggedIn, isAdmin} = require('../validation/authValidator')
const uploader = require('../middlewares/multerMiddleware');
const { addProduct } = require('../controller/productController');

const productRouter = express.Router();

productRouter.post('/', isLoggedIn, isAdmin, uploader.single('productImage'), addProduct);

module.exports = productRouter