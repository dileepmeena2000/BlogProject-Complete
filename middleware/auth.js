const jwt = require('jsonwebtoken')
const AdminModel= require('../models/admin')

const checkAdminAuth = async (req,res,next)=>{
    // console.log('hello middleware')
    const {token}= req.cookies
    // console.log(token)
    if(!token){
        req.flash('error',"Unauthorized admin")
        res.redirect('/login')
    }else{
        const data = jwt.verify(token,'ansh9754')
        // console.log(data)
        const admin = await AdminModel.findOne({_id:data.id})
        // console.log(admin)
        req.admin = admin
        next()
    }
        
      
}

module.exports= checkAdminAuth