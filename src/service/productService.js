const cloudinary = require('cloudinary').v2;
const InternalServerError = require('../utils/internalServerError');
const productRepository = require('../repository/productRepository');
const fs = require('fs/promises');
const NotFoundError = require('../utils/notFoundError');

async function createProduct(productDetails) {
    let productImage = null;

    try {
        if (productDetails.imagePath) {
            // Upload to Cloudinary
            const cloudinaryResponse = await cloudinary.uploader.upload(productDetails.imagePath);
            productImage = cloudinaryResponse.secure_url;

            // Delete local file after upload
            await fs.unlink(productDetails.imagePath);
        }

        // Save to DB with image if uploaded
        const product = await productRepository.createProduct({
            ...productDetails,
            productImage  // pass only the URL
        });

        return product;
    } catch (error) {
        console.log(error);
        throw new InternalServerError();
    }
}

async function getProductById(productId) {
    const response = await productRepository.findProduct(productId);
    if (!response) {
        throw new NotFoundError('product');
    }
    return response;
}

async function deleteProductById(productId) {
    const response = await productRepository.deleteProductById(productId);
    if (!response) {
        throw new NotFoundError('product');
    }
    return response;
}

module.exports = {
    createProduct,
    getProductById,
    deleteProductById
};
