
const AboutModel = require("../models/About");
const AdminModel = require("../models/admin");
const adminmodel = require('../models/admin')
const BlogModel = require("../models/Blog")
const CategoryModel = require("../models/Category")
const randomstring = require("randomstring");
const nodemailer = require('nodemailer')
const bcrypt = require("bcrypt");

class FrontController {
    //method
    static home = async(req , res)=>{
       try{
        const blogs= await BlogModel.find().sort({_id:-1}).limit(6)
        // console.log(blogs)
        res.render('home',{b:blogs})

       }catch(error){
        console.log(error)
       }
    }

    static about = async(req , res)=>{
        try{
            const about= await AboutModel.findOne()
            console.log(about)//
            res.render('about',{a:about})

    
           }catch(error){
            console.log(error)
           }
    }

    static blog = async(req , res)=>{
        try{
            const blogs= await BlogModel.find().sort({_id:-1})
            // console.log(blogs)
            res.render('blog',{b:blogs})
    
           }catch(error){
            console.log(error)  
           }
    }
    
    static contact =(req , res)=>{
        res.render('contact')
    }

    static details =async(req , res)=>{
        try{
            const details= await BlogModel.findById(req.params.id)
            const recentblogs=await BlogModel.find().limit(6)
            const category = await CategoryModel.find()
            
            res.render ('details',{d:details, r:recentblogs, c:category})

        }catch(error){
            console.log(error)
        }
        

    }

    static login =async (req , res)=>{
        try{
        res.render('login',{message:req.flash('error')})
        }catch(error){
            console.log(error)
        }    
                
    }

    static ragister =(req , res)=>{
        res.render('ragister',{message:req.flash('error')})
    }


     // Forget password
  static forgetPasswordVerify = async (req, res) => {
    try {
      const { email } = req.body;
      const userData = await AdminModel.findOne({ email: email });
      //console.log(userData)
      if (userData) {
        const randomString = randomstring.generate();
        await AdminModel.updateOne(
          { email: email },
          { $set: { token: randomString } }
        );
        this.sendEmail(userData.name, userData.email, randomString);
        req.flash("success", "Plz Check Your mail to reset Your Password!");
        res.redirect("/");
      } else {
        req.flash("error", "You are not a registered Email");
        res.redirect("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  static sendEmail = async (name, email, token) => {
      // console.log(name,email,status,comment)
      // connenct with the smtp server

      let transporter = await nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,

        auth: {
          user: "nirpalrawat@gmail.com",
          pass: "hiwcltdwewabjihm",
        },
      });
      let info = await transporter.sendMail({
        from: "test@gmail.com", // sender address
        to: email, // list of receivers
        subject: "Reset Password", // Subject line
        text: "heelo", // plain text body
        html:
          "<p>Hii " +
          name +
          ',Please click here to <a href="http://localhost:3000/reset-password?token=' +
          token +
          '">Reset</a>Your Password.',
      });
  };
  static reset_Password = async (req, res) => {
      try {
        const token = req.query.token;
        const tokenData = await AdminModel.findOne({ token: token });
        if (tokenData) {
          res.render("reset-password", { user_id: tokenData._id });
        } else {
          res.render("404");
        }
      } catch (error) {
        console.log(error);
      }
    };
    static reset_Password1 = async (req, res) => {
      try {
        const { password, user_id } = req.body;
        const newHashPassword = await bcrypt.hash(password, 10);
        await AdminModel.findByIdAndUpdate(user_id, {
          password: newHashPassword,
          token: "",
        });
        req.flash("success", "Reset Password Updated successfully ");
        res.redirect("/");
      } catch (error) {
        console.log(error);
      }
    };

}

module.exports = FrontController