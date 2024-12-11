const AboutModel = require("../../models/About")

class AboutController{

static aboutdisplay = async (req,res)=>{
    try{
        const about= await AboutModel.findOne()
        console.log(about)
        res.render('/about')

    }catch(error){
        console.log(error)
    }


}

}

module.exports=AboutController