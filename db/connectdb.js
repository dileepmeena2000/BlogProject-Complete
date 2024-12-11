const mongoose =require('mongoose')


const connectDb = () =>{

    return mongoose.connect('mongodb://127.0.0.1:27017/blogprojject')

.then(()=>{

    console.log('connect DB')

})
.catch((error)=>{

    console.log(error)
})


}

module.exports = connectDb