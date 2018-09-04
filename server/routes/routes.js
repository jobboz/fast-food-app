import express from "express";
import MyController from './../controllers/myControl';
const router = express.Router();


router.route('/foods')
.get(MyController.getAllFoods)










export default router;