import myFoods from './../models/list'



export default class deleteController {


    static deleteSpecificFoods(req, res) {
        const food = myFoods.find(foods => foods.foodId === parseInt(req.params.foodID))
        if (!food)
               res.status(400).send({
                status: 'not found',
                message: `the food with the given id ${parseInt(req.params.foodID)} was not found`
            })
        const index = myFoods.indexOf(food)
        myFoods.splice(index, 1)
            res.status(200).send({
            status: 'success',
            message: 'successfully deleted', food
        });

    }

    
}