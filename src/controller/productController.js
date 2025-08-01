const { createProduct, getProductById, deleteProductById } = require("../service/productService");
const AppError = require("../utils/AppError");

async function addProduct(req, res) {

    try {

        const { productName, description, price, category, brand, quantity } = req.body;
        const image = req.file?.path;

        const product = await createProduct({productName, description, price, category, brand, quantity, image})
        return res.status(200).json({
            success: true,
            message: 'successfully created the product',
            error: {},
            data: product
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
            error: error,
            message: 'something went wrong',
            data: {}
        })
    }
    
}

async function getProduct(req, res) {
    try {
        const product = await getProductById(req.params.id);

        return res.status(200).json({
            success: true,
            message: 'successfully fetched the product',
            error: {},
            data: product
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
            error: error,
            message: 'something went wrong',
            data: {}
        })
    }
}

async function deleteProduct(req, res) {
    try {
        const product = await deleteProductById(req.params.id);

        return res.status(200).json({
            success: true,
            message: 'successfully deleted the product',
            error: {},
            data: {product}
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
            message: 'something went wrong',
            error: error,
            data: {}
        })
    }
}

module.exports = {
    addProduct,
    getProduct,
    deleteProduct
}