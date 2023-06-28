const Shopkeeper = require('../models/shopkeeper');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');
const Product = require('../models/product')
const { default: mongoose } = require('mongoose');

module.exports.signUp = async (req, res) => {
    try {
        const exist = await Shopkeeper.findOne({email: req.body.email})
        if (exist) {
            return res.status(401).json({ message: 'Admin already registered'});
        }
        const shopkeeper = req.body;
        const newShopkeeper = new Shopkeeper(shopkeeper);
        await newShopkeeper.save();
        res.status(200).json({
            message: shopkeeper
            
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.signIn = async (req, res) => {
    try {
        let shopkeeper = await Shopkeeper.findOne({email:req.body.email})
        if (shopkeeper) {
            let isMatch = await bcrypt.compare(req.body.password, shopkeeper.password);
            if (isMatch) {
                return res.status(200).json({
                    id: shopkeeper._id,
                    user: 'shopkeeper',
                    token: generateToken(shopkeeper._id)
                })
            }else{
                return res.status(401).json('Invalid Login')
            }
        }
    } catch (error) {
        res.status(500).json('Error ', error.message);
    }
}


module.exports.post = async(req, res) => {
    try {
        const shopkeeper = await Shopkeeper.findById(req.params.id)
        if (shopkeeper) {
            const newproduct = new Product({
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                warranty: req.body.warranty,
                company: req.body.company,
                reviews: req.body.reviews,
                shopkeeper: req.params.id, 
            })
            if (req.files) {
                newproduct.images = req.files.map(file => file.path);
            }
            shopkeeper.products.push(newproduct)
            await shopkeeper.save();
            await newproduct.save();
        }
        const products = await Product.find({shopkeeper: req.params.id})
        res.status(200).json(products)
        console.log(shopkeeper);
    } catch (error) {
        // res.status(500).json('Error ', error.message);
        console.log(error);
    }
}

module.exports.get = async(req, res) => {
    try {
        const products = await Product.find({shopkeeper: req.params.id})
        res.status(200).json(products)
    } catch (error) {
        console.log(error);
    }
}

module.exports.getSingle = async(req, res) => {
    try {
        const products = await Product.findOne({_id: req.params.id})
        res.status(200).json(products)
    } catch (error) {
        console.log(error);
    }
}

module.exports.edit = async (req, res) => {
    try {
        var newvalues = { $set: {
            name: req.body.name, 
            company: req.body.name,
            description: req.body.description,
            price: req.body.price,
            warranty: req.body.warranty,
            images: req.body.images
        } };
        const result = await Product.updateOne({_id: req.params.id}, newvalues)
        const fetchData = await Product.findOne({_id: req.params.id});
        res.status(200).json(fetchData)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.destroy = async (req, res) => {
    try {
        const exist = await Product.findById(req.body._id);
        if (exist) {
            await exist.deleteOne();
            await Shopkeeper.findByIdAndUpdate(req.params.id, { $pull: { products: req.body._id } })
            const products = await Product.find({shopkeeper: req.params.id})
            res.status(200).json(products)
        }
         else {
            res.status(404).json({ message: "Interview not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

