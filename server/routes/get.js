import express from "express";
import MyController from './../controllers/myControl';
const router = express.Router();
import foodValidate from './../middleware/validate';

router.route('/foods')
    .get(MyController.getAllFoods)
//     .post(foodValidate.createOrderValidator,MyController.createNewOrder);

 router.route('/foods/:foodID')
  .get(MyController.getSpecificFoods)
//     .put(foodValidate.modifyOrderValidator, MyController.modifyInput)
//     .delete(MyController.deleteSpecificFoods)









export default router;