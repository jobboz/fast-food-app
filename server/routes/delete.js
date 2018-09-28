import express from "express";
import deleteController from './../controllers/delController';
const router = express.Router();

router.route('/foods/:foodID')
.delete(deleteController.deleteSpecificFoods)











export default router;