import myFoods from './../models/list'
import { request } from 'https';


export default class MyController {
    static getAllFoods(req, res) {
        return res.status(200).send({
            status: 'success',
            message: 'successfully retrived all school',
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
        const index = myFoods.indexOf(food)
        return res.status(200).send({
            status: 'success',
            message: 'successfully retrived', food
        });

    }



    static deleteSpecificFoods(req, res) {
        const food = myFoods.find(foods => foods.foodId === parseInt(req.params.foodID))
        if (!food)
            return res.status(404).send({
                status: 'not found',
                message: `the food with the given id ${parseInt(req.params.foodID)} was not found`
            })
        const index = myFoods.indexOf(food)
        myFoods.splice(index, 1)
        return res.status(200).send({
            status: 'success',
            message: 'successfully deleted', food
        });

    }
    static createNewOrder(req, res) {
        const newId = myFoods[myFoods.length - 1].foodId + 1;
        for (let i = 0; i < myFoods.length; i++) {
            if (myFoods[i].name === req.body.name) {
                return res.send({
                    message: 'there is a food with the name already, name must be unique'
                })
            }
        }
        myFoods.push({
            foodId: newId,
            name: req.body.name,
            amount: req.body.amount,
            quantity: req.body.quantity,
            deliveryAddress: req.body.deliveryAddress

        })
        return res.status(201).send({
            status: 'created',
            message: 'successfully created',
            myFoods
        })
    }

    static modifyInput(req, res) {
        const { name, amount, quantity, deliveryAddress } = req.body;
        for (var i = 0; i < myFoods.length; i++) {
            if (myFoods[i].foodId === parseInt(req.params.foodID)) {
                myFoods[i].name = name || myFoods[i].name
                myFoods[i].amount = amount || myFoods[i].amount
                myFoods[i].quantity = quantity || myFoods[i].quantity
                myFoods[i].deliveryAddress = deliveryAddress || myFoods[i].deliveryAddress
                res.status(200).send({
                    status: 'success',
                    message: 'successfully updated an order',
                    myFoods
                })
            }
        }
        return res.status(404)
            .send({
                status: 'bad request',
                message: `food with id ${parseInt(req.params.foodID)} does not exit`
            })
    }


}

















