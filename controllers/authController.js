const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')



exports.signup = async(req,res)=>{
    try {
        const {username,password,email,role} = req.body
        const existingUser = await User.findOne({username})

        if(existingUser) return res.status(400).json({
            message:`Username already exists`
        });

        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = new User({username,password:hashedPassword,email,role})
        await newUser.save()
        res.status(201).json({
            message:`User created successfully`
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({message:`server Error`})
    }
}

exports.login = async(req,res)=>{
    try {
        const {username,password} = req.body
        const user = await User.findOne({username})
        if(!user) return res.status(400).json({
            message:"no user exist with this username"
        })
        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch) return res.status(400).json({
            message:`Invalid password`
        })

        const token = jwt.sign(
            {id:user._id,role:user.role},
            process.env.JWT_SECRET,
            {expiresIn:"30m"})
        res.status(200).json({
            token:token,
            message:`Login successful`,
            user:{
                id:user._id,
                username:user.username,
                email:user.email,
                role:user.role
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({message:`server Error`})
    }
}