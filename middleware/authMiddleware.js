const jwt = require('jsonwebtoken')


const authMiddleware = async(req,res,next)=>{
 try {
    const authorization = req.headers.authorization
    if(!authorization) return res.status(401).json({
        message:"Unauthorized"
    })
    const token = authorization.split(" ")[1]
    if(!token) return res.status(401).json({
        message:"Invalid Token"
    })

    const data = jwt.verify(token,process.env.JWT_SECRET)
    req.user = data
    next()

 } catch (error) {
    console.error(error)
    res.status(500).json({
        message:"Invalid or expired token"
    })
 }
}


module.exports = authMiddleware