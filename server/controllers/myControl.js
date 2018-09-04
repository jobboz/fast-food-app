import myFoods from './../models/list'


export default class MyController {
    static getAllFoods(req,res) {
        res.status(200).send({
            status:'success',
            message:'successfully retrived all school',
            myFoods
        })
    }
    
    }














