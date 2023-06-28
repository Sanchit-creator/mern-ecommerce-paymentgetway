const express = require('express');
const router = express.Router();
const shopkeeperController = require('../controllers/shopkeeper_controllers')
const protect = require('../middlewares/authMiddleware')
const upload = require('../middlewares/upload')

router.post('/register-shopkeeper', shopkeeperController.signUp)
router.post('/login', shopkeeperController.signIn)
router.post('/upload/:id', protect, upload.array('images[]'), shopkeeperController.post)
router.post('/delete/:id', protect, shopkeeperController.destroy)
router.get('/products/:id', protect, shopkeeperController.get)
router.get('/single/:id', protect, shopkeeperController.getSingle)
router.patch('/update/:id', protect, shopkeeperController.edit)

module.exports = router