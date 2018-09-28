import express from "express";
import modifyController from './../controllers/modifyController'
import foodValidate from './../middleware/validate';
const router = express.Router();


router.route('/foods/:foodID')
.put(foodValidate.modifyOrderValidator, modifyController.modifyInput)













export default router;