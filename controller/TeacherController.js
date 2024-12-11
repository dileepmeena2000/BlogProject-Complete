
class TeacherController{

    static display = (req,res)=>{
       res.render('teacher/display')
    }

    static create = (req,res)=>{
        res.render('teacher/create')
     }

    
}




module.exports = TeacherController