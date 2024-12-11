const BlogModel = require('../../models/Blog')
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dnnjy3m9d',
    api_key: '496628168362253',
    api_secret: '0jjqIxhaPufA64x2bUq5n7imm-4'
});

class BlogController {

    static displayBlog = async (req, res) => {
        try {
            const data = await BlogModel.find()
            // console.log(data)
            res.render('admin/blog/display', { d: data })

        } catch (error) {
            console.log(error)
        }
    }
    static insertblog = async (req, res) => {
        try {
            // console.log(req.files.image)
            const file = req.files.image
            const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: 'BlogImage'
            })
            
            // console.log(myimage)
            const result = new BlogModel({
                title: req.body.title,
                description: req.body.description,
                image: {
                    public_id: myimage.public_id,
                    url: myimage.url
                }
            });
            await result.save()
            // console.log(result)
            res.redirect('/admin/displayblog') // this route for after submit the form dirctet on display page

        } catch (error) {
            console.log(error)
        }

    }
    static blogview = async (req, res) => {
        try {
            // console.log(req.params.id)
            const data = await BlogModel.findById(req.params.id)
            // console.log(data)
            res.render('admin/blog/view', { view: data })

        } catch (error) {
            console.log(error)
        }
    }
    static blogedit = async (req, res) => {
        try {
            // console.log(req.params.id)
            const data = await BlogModel.findById(req.params.id)
            // console.log(data)
            res.render('admin/blog/edit', { edit: data })

        } catch (error) {
            console.log(error)
        }
    }

    static blogupdate = async (req, res) => {
        try {
            // console.log(req.body)
             // delete image by browser cloudinary
             const blog= await BlogModel.findById(req.params.id)
             const imageid= blog.image.public_id
             await cloudinary.uploader.destroy(imageid)
             //update image
             const file = req.files.image
             const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
                 folder: 'BlogImage'
             })

            const update = await BlogModel.findByIdAndUpdate(req.params.id, {
                title: req.body.title,
                description: req.body.description,
                image: {
                    public_id: myimage.public_id,
                    url: myimage.url
                }
            })
            await update.save()
            // console.log(update)
            res.redirect('/admin/displayblog') // this route for after submit the form dirctet on display page

        } catch (error) {
            console.log(error)
        }

    }

    static blogdelete = async (req, res) => {
        try {
            // delete image by browser cloudinary
            const blog= await BlogModel.findById(req.params.id)
            const imageid= blog.image.public_id
            await cloudinary.uploader.destroy(imageid)


            await BlogModel.findByIdAndDelete(req.params.id)

            res.redirect('/admin/displayblog')

        } catch (error) {
            console.log(error)
        }
    }







}
module.exports = BlogController