import myFoods from './../models/list'



export default class createController {

    static createNewOrder(req, res) {
        const newId = myFoods[myFoods.length - 1].foodId + 1;
        myFoods.push({
            foodId: newId,
            name: req.body.name,
            amount: req.body.amount,
            quantity: req.body.quantity,
            deliveryAddress: req.body.deliveryAddress

        })
        return res.status(201)
            .send({
                status: 'created',
                message: 'successfully created',
                myFoods
            });
    }










    
}