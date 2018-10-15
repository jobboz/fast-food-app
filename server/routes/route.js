import express from 'express';
import Control from './../controllers/mycontrl'
import userValidator from './../middleware/userValidator'
const router = express.Router();


router.route('/foods')
.post(userValidator.addUserValidation, Control.creatUsers)
 .get(Control.getAllUsers)

 router.route('/foods/:id')
 .get(Control.getSpecificOrders)
 .put(userValidator.modifyUserValidation, Control.modifyOrders)
 .delete(Control.deleteOrder)










export default router;
