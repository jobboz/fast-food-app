import express from "express";
import foodValidate from './../middleware/validate';
const router = express.Router();

router.route('/foods')
.post(foodValidate.createOrderValidator);

router.route('/foods/:foodID')
.put(foodValidate.modifyOrderValidator);









export default router;