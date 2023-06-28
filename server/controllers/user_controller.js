const User = require('../models/user');
const Product = require('../models/product')
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');
const { default: mongoose } = require('mongoose');

module.exports.signUp = async (req, res) => {
    try {
        const exist = await User.findOne({email: req.body.email})
        if (exist) {
            return res.status(401).json({ message: 'Admin already registered'});
        }
        const user = req.body;
        const newUser = new User(user);
        await newUser.save();
        res.status(200).json({
            message: user
            
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.signIn = async (req, res) => {
    try {
        let user = await User.findOne({email:req.body.email})
        if (user) {
            let isMatch = await bcrypt.compare(req.body.password, user.password);
            if (isMatch) {
                return res.status(200).json({
                    id: user._id,
                    user: 'user',
                    token: generateToken(user._id)
                })
            }else{
                return res.status(401).json('Invalid Login')
            }
        }
    } catch (error) {
        res.status(500).json('Error ', error.message);
    }
}

module.exports.getProducts = async(req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
    }
}

module.exports.getProductDetail = async(req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
    }
}

module.exports.postReview = async(req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        const newReview = req.body.reviews;
        product.reviews.push(newReview);
        const updateProduct = await product.save();
        res.status(200).json(updateProduct);
    } catch (error) {
        console.log(error);
    }
}

module.exports.checkout = async (req, res) => {
    const instance = require('../index');
    const options = {
        amount: Number(req.body.total_amount * 100),
        currency: 'INR',
    };
    const order = await instance.instance.orders.create(options)
    res.status(200).json({
        success: true,
        order
    })
}

module.exports.paymentVerification = async(req, res) => {
    const crypto = require('crypto');
    const Payment = require('../models/payment')
    try {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body
    const body  = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac('sha256', '50j2pWtfT2jL0wmJH0K2frXX')
                                    .update(body.toString())
                                    .digest('hex')
                                    console.log(razorpay_signature);
                                    console.log(expectedSignature);

                                const isAuthentic = expectedSignature === razorpay_signature;
                                if (isAuthentic) {
                                    await Payment.create({
                                        razorpay_payment_id, 
                                        razorpay_order_id, 
                                        razorpay_signature
                                    })
                                    res.status(200).json({mesage: 'Payment Successfull return back'})
                                }
    } catch (error) {
        console.log(error);
    }
    
}
