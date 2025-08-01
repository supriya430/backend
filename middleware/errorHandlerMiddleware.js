const errorHandler = (err,req,res,next)=>{
    console.error(err.stack)

    res.status(err.statusCode).json({
        status:"fail",
        message:err.message
    })
}

module.exports = errorHandler

//bad input, authentication faliure, db operation failure , async errors, external api / file system issues,
//synatx error at startup 