const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    price:{
        type:Number,
        required:true
    },
    stockQuantity:{
        type:Number,
        required:true
    },
    uploadedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true})

module.exports = mongoose.model('Product',productSchema)