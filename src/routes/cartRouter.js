const express = require('express');
const {isLoggedIn} = require('../validation/authValidator');
const { getCartById, modifyProductToCart, clearCartById } = require('../controller/cartController');

const cartRouter = express.Router();

cartRouter.get('/', isLoggedIn, getCartById);
cartRouter.post('/:operation/:productId', isLoggedIn, modifyProductToCart);
cartRouter.delete('/products', isLoggedIn, clearCartById)

module.exports = cartRouter