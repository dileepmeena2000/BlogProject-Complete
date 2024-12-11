const AdminModel = require("../../models/admin")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


class AdminController {

    static dashboard = async(req, res) => {
        try{
            const{name,email}= req.admin

            res.render('admin/dashboard',{n:name,e:email})

        }catch(error){
            console.log(error)
        }
       
    }

    static ragister = async (req, res) => {
        try {
            const { name, email, password, confirmpassword } = req.body
            const admin = await AdminModel.findOne({ email: email })

            if (admin) {
                req.flash('error', "Email Already Exists")
                res.redirect('/ragister')
            } else {

                if (name && email && password && confirmpassword) {


                    if (password == confirmpassword) {

                        const hashpassword = await bcrypt.hash(password, 10)


                        const ragister = await AdminModel({
                            name: name,
                            email: email,
                            password: hashpassword
                        });
                        await ragister.save()
                        res.redirect('/login')

                    } else {
                        req.flash('error', "Password and Confirm password does not match")
                        res.redirect('/ragister')
                    }
                } else {
                    req.flash('error', "All field are Required")
                    res.redirect('/ragister')

                }

            }


        } catch (error) {
            console.log(error)
        }
        // console.log(req.body)


    }

    static verifylogin = async (req, res) => {
    // console.log('Received login data:', req.body);
    try {
        const { email, password } = req.body;

        // Check if all fields are provided
        if (!email || !password) {
            req.flash('error', "All fields are required");
            return res.redirect('/login');
        }

        const admin = await AdminModel.findOne({ email: email });

        if (!admin) {
            req.flash('error', "Email or Password is incorrect");
            return res.redirect('/login');
        }

        const isMatched = await bcrypt.compare(password, admin.password);

        if (!isMatched) {
            req.flash('error', "Email or Password is incorrect");
            return res.redirect('/login');
        }

        // console.log('Admin found:', admin);
        // console.log('Admin role:', admin.admin); // Log the admin role

        if (admin.admin != null) {
            req.flash('error', "You do not have admin access");
            return res.redirect('/login');
        }

        // Generate JWT token
        const token = jwt.sign({ id: admin._id }, 'ansh9754');
        // console.log('Generated token:', token);
        res.cookie('token', token);

        return res.redirect('/admin/dashboard');
    } catch (error) {
        console.error(error);
        req.flash('error', "An error occurred during login");
        return res.redirect('/login');
    }
};

   
//     // static verifylogin=async(req,res)=>{
//     //     try {
//     //       // console.log(req.body)
//     //       const {email,password}=req.body
//     //       const verify=await AdminModel.findOne({email:email})
//     //       if(verify){
//     //         const ismatch=await bcrypt.compare(password,verify.password)
//     //         if(ismatch){
//     //           if(verify.verify === '1'){
//     //              const token=jwt.sign({ID:verify._id},'SHIVANIJSSNNNNHUYRT')
//     //              res.cookie('token',token)
//     //              res.redirect('/admin/dashboard')
//     //           }else{
//     //           req.flash('success','Please Verify your email & Successfully Login')
//     //           res.redirect('/login')
//     //           }
//     //         }else{
//     //           req.flash('success','Please chek UserID & Password')
//     //           res.redirect('/login')
//     //         }
//     //       }else{
//     //        req.flash('success','Please enter register Email')
//     //        res.redirect('/login')
//     //       }
//     //     } catch (error) {
//     //        console.log(error)
//     //     }
//     //   }

    static logut = async (req, res) => {
        try {
            res.clearCookie('token')
            res.redirect('/login')

        } catch (error) {
            console.log(error)
        }
    }








// }

}
module.exports = AdminController