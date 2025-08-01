const express = require('express')
const { addProduct, getProducts, deleteProduct, updateProducts } = require('../controllers/productController')
const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')


const router = express.Router()

router.post('/addproduct',authMiddleware,adminMiddleware,addProduct)
// router.get('/getproduct',authMiddleware,adminMiddleware,getProducts)
// router.post('/addproduct',addProduct)
router.get('/getproduct',getProducts)
router.delete('/deleteproduct/:id',deleteProduct)
router.put('/updateproduct/:id',updateProducts)

module.exports = router