

const adminMiddleware = (req,res,next)=>{
    if(req.user.role !== 'admin'){
        return res.status(403).json({
            msg:`Forbidden`
        })
    }
    next()
}

module.exports = adminMiddleware