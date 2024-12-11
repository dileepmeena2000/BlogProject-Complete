const ContactModel = require('../../models/Contact')

class ContactController{

static insertcontact= async (req,res)=>{
    try{
        const insert = await new ContactModel({
            name: req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            message: req.body.message,
        })
        await insert.save()
        res.redirect('/admin/contactdisplay')

    }catch(error){
        console.log(error)
    }

   
}

static contactdisplay = async (req,res)=>{
    try{
        const display= await ContactModel.find()
        // console.log(display)
        res.render('admin/contact/display',{d:display})

    }catch(error){
        console.log(error)
    }


}

static contactview = async (req,res)=>{
    try{
        const display= await ContactModel.findById(req.params.id)
        // console.log(display)
        res.render('admin/contact/view',{view: display})

    }catch(error){
        console.log(error)
    }


}

static contactedit = async (req,res)=>{
    try{
        const display= await ContactModel.findById(req.params.id)
        // console.log(display)
        res.render('admin/contact/edit',{edit: display})

    }catch(error){
        console.log(error)
    }


}

static contactupdate= async (req,res)=>{
    try{
        const update = await ContactModel.findByIdAndUpdate(req.params.id,{
            name: req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            message: req.body.message,
        })
        await update.save()
        res.redirect('/admin/contactdisplay')

    }catch(error){
        console.log(error)
    }

   
}

static contactdelete = async(req,res)=>{
    try{
        await ContactModel.findByIdAndDelete(req.params.id)


    } catch(error){
        console.log(error)
    }
}




}
module.exports= ContactController