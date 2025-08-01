const mongoose = require('mongoose')


async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected`);
    }
    catch(error){
        console.error(`Error connecting to monogDB: ${error.message}`)
        process.exit(1)
    }
}

module.exports = connectDB;