const express = require('express')
const web = require('./routes/web')
const connectdb = require('./db/connectdb')
const app = express()
const port = 3000
const fileUpload = require ("express-fileupload");
var cloudinary = require('cloudinary');
var session = require('express-session');
var flash = require('connect-flash');

//cokkie for security
const cookieparser =require('cookie-parser')
app.use(cookieparser())


// connect to mongoose
connectdb()

//this is used for get data
app.use(express.urlencoded({extended:false}))

//for image upload
app.use(fileUpload({useTempFiles: true}));

// for flash message
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}));

app.use(flash());

//router load
app.use('/',web)

//ejs setup
app.set('view engine', 'ejs')

//public folder setup
app.use(express.static('public'))

//creat server
app.listen(port,console.log('server start localhost:3000'))