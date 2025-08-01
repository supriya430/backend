const Products = require("../models/Products")



exports.addProduct = async(req,res)=>{
    try {
        const {name,brand,description,price,stockQuantity}=req.body
        const existingProduct = await Products.findOne({name})
        if(existingProduct){
            return res.status(400).json({
                msg:`Product already exists`
            })
        }
        const newProduct = new Products({
            name,
            description,
            price,
            stockQuantity,
            brand,
            uploadedBy: req.user.id

        })

        await newProduct.save()
        res.status(201).json({
            msg:`Product added successfully`,
            data:newProduct
        })
    } catch (error) {
         console.error(error)
        res.status(500).json({message:`server Error`})
    }
}



exports.getProducts = async(req,res)=>{
    try{
        const product = await Products.find().sort({createdAt : -1})

        res.status(200).json({
            msg:`successfully getting the products`,
            products:product
        })
    }catch (error) {
         console.error(error)
        res.status(500).json({message:`server Error`})
    }
}

exports.deleteProduct = async(req,res)=>{
    try {
        const product = await Products.findByIdAndDelete(req.params.id)
        if(!product) return res.status(400).json({
            msg:`Product not found`
        })

        res.status(200).json({
            msg:"Product Deleted Successfully"
        })
    } catch (error) {
         console.error(error)
        res.status(500).json({message:`server Error`})
    }
}

exports.updateProducts = async(req,res)=>{
    try {
        const productid = req.params.id
        const {name,brand,description,price,stockQuantity}=req.body
        const findProduct = await Products.findOne({_id:productid})
        if(!findProduct) {
            return res.status(404).json({
                msg:`student not found`
            })
        }
        const updatedFields = {}
        if(name) updatedFields.name = name
        if(brand) updatedFields.brand = brand
        if(stockQuantity) updatedFields.stockQuantity = stockQuantity
        if(price) updatedFields.price = price
        if(description) updatedFields.description = description

        const updateProduct = await Products.findByIdAndUpdate(
            productid,
            {
                $set:updatedFields
            },
            {
                new:true
            }
        )

        if(!updateProduct){
            return res.status(404).json({
                msg:`the product id is incorrect`
            })
        }

        res.status(201).json({
            msg:`successfully updated`,
            updated_Details:updateProduct
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({message:`server Error`})
    }
}