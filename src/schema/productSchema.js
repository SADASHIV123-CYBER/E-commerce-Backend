const { default: mongoose } = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Product name is required'],
    },

    description: {
        type: String,
        trim: true
    },

    price: {
        type: Number,
        required: [true, 'Price is required']
    },

    category: {
        type: String,
        enum: ['Electronics', 'Clothing', 'Footwear', 'Home', 'Books', 'Beauty', 'Grocery', 'Sports', 'Toys'],
        required: true
    },

    brand: {
        type: String,
        required: [true, 'Brand is required'],
        default: 'Generic'
    },

    quantity: {
        type: Number,
        min: 10,
        default: 0
    },

    image: {
        type: String,
    }

}, {
    timestamps: true
});


const Product = mongoose.model('Product', productSchema);

module.exports = Product
