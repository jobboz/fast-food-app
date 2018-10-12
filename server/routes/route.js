import express from 'express';
import Control from './../controllers/mycontrl'
const router = express.Router();


router.route('/foods')
.post(Control.creatOrder)
 .get(Control.getAllOrders);

 router.route('/foods/:id')
 .get(Control.getSpecificOrders)










export default router;
