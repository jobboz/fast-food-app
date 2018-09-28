import myFoods from './../models/list'



export default class MyController {
    static getAllFoods(req, res) {
        return res.status(200).send({
            status: 'success',
            message: 'successfully retrived all orders',
            myFoods
        })
    }
    static getSpecificFoods(req, res) {
        const food = myFoods.find(foods => foods.foodId === parseInt(req.params.foodID))
        if (!food)
            return res.status(404).send({
                status: 'not found',
                message: 'the food with the given id was not found'
            })
        // const index = myFoods.indexOf(food)
        return res.status(200).send({
            status: 'success',
            message: 'successfully retrived', food
        });

    }


}















