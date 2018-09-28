import express from "express";
import MyController from './../controllers/getControl';
const router = express.Router();

router.route('/foods')
    .get(MyController.getAllFoods)
 router.route('/foods/:foodID')
  .get(MyController.getSpecificFoods)








export default router;