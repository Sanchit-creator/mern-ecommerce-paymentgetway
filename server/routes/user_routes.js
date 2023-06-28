const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller')
const protect = require('../middlewares/authMiddleware')

router.post('/register-user', userController.signUp)
router.post('/login', userController.signIn)
router.post('/post/:id', protect, userController.postReview)
router.post('/checkout', protect, userController.checkout)
router.post('/paymentverification', userController.paymentVerification)
router.get('/products', protect, userController.getProducts)
router.get('/product/:id', protect, userController.getProductDetail)


module.exports = router