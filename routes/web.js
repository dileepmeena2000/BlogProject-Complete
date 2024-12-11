const express = require ('express')
// const router = express.Router()
const FrontController = require('../controller/FrontController')
const TeacherController = require('../controller/TeacherController')
const AdminController = require ('../controller/admin/AdminController')
const BlogController = require('../controller/admin/BlogController')
const CategorieController = require('../controller/admin/CategorieController')
const AboutController = require('../controller/admin/AboutController')
const ContactController = require('../controller/admin/ContactController')
const auth =require('../middleware/auth')


const router = express.Router()


//FrontController of blog project
router.get('/' , FrontController.home)
router.get('/about' ,FrontController.about)
router.get('/blog' ,FrontController.blog)
router.get('/contact' ,FrontController.contact)
router.get('/details' ,FrontController.details)
router.get('/login' ,FrontController.login)
router.get('/ragister',FrontController.ragister)
router.get('/details/:id' ,FrontController.details)

//AdminController
router.get('/admin/dashboard',auth,AdminController.dashboard)
router.post('/adminragister',AdminController.ragister)
router.post('/adminlogin',AdminController.verifylogin)
router.get('/logout',AdminController.logut)

//blogController
router.get('/admin/displayblog',auth,BlogController.displayBlog)
router.post('/insertblog',auth,BlogController.insertblog)
router.get('/blogview/:id',BlogController.blogview)
router.get('/blogedit/:id',BlogController.blogedit)
router.post('/blogupdate/:id',BlogController.blogupdate)
router.get('/blogdelete/:id',BlogController.blogdelete)

//CategorieController
router.get('/admin/categoriedisplay',auth,CategorieController.displaycateogry)
router.post('/insertcategory',auth,CategorieController.insertcategory)
router.get('/categoryview/:id',CategorieController.Categoryview)
router.get('/categoryedit/:id',CategorieController.Categoryedit)
router.post('/categoryupdate/:id',CategorieController.categoryupdate)
router.get('/categorydelete/:id',CategorieController.categorydelete)

//About Controller
router.get('/admin/aboutdisplay',auth,AboutController.aboutdisplay)

//Contact Controller
router.get('/admin/contactdisplay',auth,ContactController.contactdisplay)
router.post('/insertcontact',auth,ContactController.insertcontact)
router.get('/contactview/:id',ContactController.contactview)
router.get('/contactedit/:id',ContactController.contactedit)
router.post('/contactupdate/:id',ContactController.contactupdate)
router.get('/contactdelete/:id',ContactController.contactdelete)

//teacher
router.get('/teacher/display' ,TeacherController.display)
router.get('/teacher/create' ,TeacherController.create)


//forget password

router.post('/forgot_Password',FrontController.forgetPasswordVerify)
router.get('/reset-password',FrontController.reset_Password)
router.post('/reset_Password1',FrontController.reset_Password1)



// module.exports= router 

module.exports = router