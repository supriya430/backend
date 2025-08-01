const Products = require("../models/Products");
const User = require("../models/User")




exports.addToCart = async(req,res)=>{
    const userId = req.user.id;
    const {productId,quantity} = req.body

    try {
        const user = await User.findById(userId).populate('cart.product')

        const product = await Products.findById(productId)
        if(!product) return res.status(404).json({
            msg:`product not found`
        })

        const existingItem = user.cart
        .find(item => item.product._id.toString() === productId)
        if(existingItem){
            existingItem.quantity += quantity;
        }
        else{
            user.cart.push({product:productId,quantity})
        }

        await user.save()
        res.status(201).json({
            msg:`Product added to the cart`, cart:user.cart
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({message:`server Error`})
    }
}

exports.getCart = async(req,res)=>{
    const userId = req.user.id

    try {
        const user = await User.findById(userId).populate('cart.product')
        res.status(200).json({
            cart:user.cart
        })
    } catch (error) {
                console.error(error)
        res.status(500).json({message:`server Error`})
    }
}

exports.removeFromCart = async(req,res)=>{
    const userId = req.user.id
    const {productId} = req.body

    try {
        const user = await User.findById(userId)
        user.cart = user.cart.filter(item => item.product.toString() !== productId)
        await user.save()
        res.status(201).json({
            msg:`Product from cart is removed successfully`,
            cart:user.cart
        })
    } catch (error) {
                console.error(error)
        res.status(500).json({message:`server Error`})
    }
}