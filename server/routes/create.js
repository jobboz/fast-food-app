import express from "express";
import MyController from './../controllers/myControl';
const router = express.Router();


router.route('/foods')
.post(MyController.createNewOrder);










export default router;