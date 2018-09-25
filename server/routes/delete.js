import express from "express";
import MyController from './../controllers/myControl';
const router = express.Router();

router.route('/foods/:foodID')
.delete(MyController.deleteSpecificFoods)











export default router;