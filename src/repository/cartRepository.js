const Cart = require("../schema/cartSchema");
const BadRequestError = require("../utils/badRequestError");
const InternalServerError = require("../utils/internalServerError");
const NotFoundError = require("../utils/notFoundError");

async function createCart(userId) {
    try {
        const newCart = await Cart.create({
            user: userId,
            items: []
        });

        return newCart


    } catch (error) {
        if(error.name === 'ValidationError') {
            const errorMessageList = Object.keys(error.errors).map(property => {
                return error.errors[property].message
            });

            throw new BadRequestError(errorMessageList)
        }

        console.log(error);
        throw new InternalServerError()
    }
}

async function getCartById(userId) {
    try {
        const getCart = await Cart.findOne({
            user: userId
        }).populate('items.product');
        return getCart
    } catch (error) {
        console.log(error);
        
        throw new InternalServerError()
    }
}

async function deleteCartById(userId) {

    try {
    const cart = await Cart.findOne({
        user: userId
    });

    if(!cart) {
        throw new NotFoundError('Cart')
    }

    cart.items = [];
    await cart.save()
    return cart     
    } catch (error) {
        console.log(error);
        
        throw new InternalServerError();
    }
    
}

module.exports = {
    createCart,
    getCartById,
    deleteCartById
}