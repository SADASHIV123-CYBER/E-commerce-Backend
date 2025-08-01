const Product = require("../schema/productSchema");

async function createProduct(productDetails) {
    try {
        const product = await Product.create(productDetails)
    } catch (error) {
        console.log(error);
    }
}