const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const { addToCart, removeFromCart, getCart } = require('../controllers/cartController')

const router = express.Router()


// router.post('/addcart',authMiddleware,addToCart)
// router.post('/removecart',authMiddleware,removeFromCart)
// router.get('/',authMiddleware,getCart)
router.post('/addcart',authMiddleware,addToCart)
router.post('/removecart',authMiddleware,removeFromCart)
router.get('/',authMiddleware,getCart)

module.exports = router