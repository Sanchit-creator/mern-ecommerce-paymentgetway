const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: {
        type: String
    },
    images: [
        {
            type: String
        }
    ],
    price: {
        type: String
    },
    description: {
        type: String
    },
    warranty: {
        type: String
    },
    company: {
        type: String
    },
    reviews: [
        {
            type: String
        }
    ],
    shopkeeper: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shopkeeper'
    } 
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;