const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const shopkeeperSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
}, {
    timestamps: true
});

// Hasing password

shopkeeperSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, 12);
    }
    next();
})


const Shopkeeper = mongoose.model('Shopkeeper', shopkeeperSchema);
module.exports = Shopkeeper;