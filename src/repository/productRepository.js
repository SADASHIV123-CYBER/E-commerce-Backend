const Product = require("../schema/productSchema");
const BadRequestError = require("../utils/badRequestError");
const InternalServerError = require("../utils/internalServerError");
const NotFoundError = require("../utils/notFoundError");

async function createProduct(productDetails) {
    try {
        const product = await Product.create(productDetails);
        return product
    } catch (error) {
        if(error.name === "ValidationError") {
            const errorMessageList = Object.keys(error.errors).map(property  => {
                return error.errors[property].message
            });
            throw new BadRequestError(errorMessageList)
        }

        console.log(error);
        throw new InternalServerError();
    }
};

async function findProduct(productId) {
    try {
        const product = await Product.findById(productId);

        if(!product) {
            throw new NotFoundError('product')
        }
        return product
    } catch(error) {

        if(error instanceof NotFoundError) {
            throw error
        }
        console.log(error);
        
        throw new InternalServerError();
    }
}

async function deleteProductById(productId) {
    try {
        const product = await Product.findByIdAndDelete(productId);

        if(!product) {
            throw new NotFoundError('product')
        }

        return product
    } catch (error) {

        if(error instanceof NotFoundError) {
            throw error
        }
        console.log(error);
        
        throw new InternalServerError()
    }
}

module.exports= {
    createProduct,
    findProduct, 
    deleteProductById
}