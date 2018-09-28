import express from "express";
import createController from './../controllers/createControl';
import foodValidate from './../middleware/validate';
const router = express.Router();


router.route('/foods')
.post(foodValidate.createOrderValidator, createController.createNewOrder);










export default router;