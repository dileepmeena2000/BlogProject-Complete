const CategoryModel = require('../../models/Category')

class CategorieController{

static displaycateogry=async (req,res)=>{
    try {
        const data = await CategoryModel.find()
        // console.log(data)
        res.render('admin/categorie/display', {d: data })

    } catch (error) {
        console.log(error)
    }

}

static insertcategory = async (req, res) => {
    try {
       
        const result = new CategoryModel({
            cat_name: req.body.cat_name,
            
           
        });
        await result.save()
        // console.log(result)
        res.redirect('/admin/Categoriedisplay') // this route for after submit the form dirctet on display page

    } catch (error) {
        console.log(error)
    }

}

static Categoryview = async (req, res) => {
    try {
        // console.log(req.params.id)
        const data = await CategoryModel.findById(req.params.id)
        // console.log(data)
        res.render('admin/categorie/view', { view: data })
    } catch (error) {
        console.log(error)
    }
}

static Categoryedit = async (req, res) => {
    try {
        // console.log(req.params.id)
        const data = await CategoryModel.findById(req.params.id)
        // console.log(data)
        res.render('admin/categorie/edit', { edit: data })

    } catch (error) {
        console.log(error)
    }
}

static categoryupdate = async (req, res) => {
    try {
       
        const update = await CategoryModel.findByIdAndUpdate(req.params.id,{
            cat_name: req.body.cat_name,
            
           
        });
        await update.save()
        //  console.log(update)
        res.redirect('/admin/Categoriedisplay') // this route for after submit the form dirctet on display page

    } catch (error) {
        console.log(error)
    }

}

static categorydelete = async (req,res) =>{
    try {
        await CategoryModel.findByIdAndDelete(req.params.id)

    } catch(error){
        console.log (error)
    }
}



}
module.exports= CategorieController