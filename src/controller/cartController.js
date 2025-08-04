const { getCart, modifyCart, clearProductFromCart } = require("../service/cartService");
const AppError = require("../utils/AppError");

async function getCartById(req, res) {

    try {
        const cart = await getCart(req.user.id);

        return res.status(200).json({
            success: true,
            message: 'successfully fetched the cart',
            error: {},
            data: cart
        })
    } catch (error) {
        if(error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                error: error,
                data: {}
            })
        }

        console.log(error);

        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error,
            data: {}
        })
        
    }
    
}

async function modifyProductToCart(req, res) {
    try {
        const cart = await modifyCart(req.user.id, req.params.productId, req.params.operation == "add");

        return res.status(200).json({
            success: false,
            message: "Successfully added product to the cart",
            error: {},
            data: {cart}
        })
    } catch (error) {
        if(error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                error: error,
                data: {}
            })
        }
        
        console.log(error);

        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error,
            data: {}
        })

    }
}

async function clearCartById(req, res) {
    try {
        const cart = await clearProductFromCart(req.user.id);
        return res.status(200).json({
            success: true,
            message: "Successfully removed product from cart",
            error: {},
            data: {cart}
        })
    } catch (error) {
        if(error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                error: error,
                data: {}
            })
        }
        
        console.log(error);

        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error,
            data: {}
        })
    }
}

module.exports = {
    getCartById,
    modifyProductToCart,
    clearCartById
}