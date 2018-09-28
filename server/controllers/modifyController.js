import myFoods from './../models/list'


export default class modifyController {

    static modifyInput(req, res) {
        const { name, amount, quantity, deliveryAddress } = req.body;
        for (var i = 0; i < myFoods.length; i++) {
            if (myFoods[i].foodId === parseInt(req.params.foodID)) {
                myFoods[i].name = name || myFoods[i].name
                myFoods[i].amount = amount || myFoods[i].amount
                myFoods[i].quantity = quantity || myFoods[i].quantity
                myFoods[i].deliveryAddress = deliveryAddress || myFoods[i].deliveryAddress
                res.status(200)
                .send({
                    status: 'success',
                    message: 'successfully updated an order',
                    myFoods
                })
            }   
        }
            res.status(404)
            .send({
                status: 'bad request',
                message: `food with id ${parseInt(req.params.foodID)} does not exit`
            })
    }








}