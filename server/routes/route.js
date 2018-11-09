import express from 'express';
import Control from './../controllers/mycontrl'
import userValidator from './../middleware/userValidator'
import orderController from './../controllers/orderController'
import UserController from './../controllers/usersController'
import orderValidator from './../middleware/orderVlidation'
import  authToken from './../middleware/authToken'
const router = express.Router();


//users rote
router.route('/foods')
.post(authToken, userValidator.addUserValidation, Control.creatUsers)
 .get(authToken, Control.getAllUsers);

 router.route('/foods/:id')
 .get(authToken, Control.getSpecificOrders)
 .put(authToken, userValidator.modifyUserValidation, Control.modifyOrders)
 .delete(authToken, Control.deleteOrder)

 //orders route
 
router.route('/orders')
.post(authToken, orderValidator.createOrderValidator, orderController.createOrders)
.get(authToken, orderController.getAllOrders)

router.route('/orders/:id')
.get(authToken, orderController.getSpecificOrder)
.put(authToken, orderValidator. modifyOrderValidator, orderController.ModifyOrder)
.delete(authToken, orderController.deleteOrder)
// //user signup and signin
 router.route('/signup')
 .post(UserController.signUp)

 router.route('/signin')
 .post(UserController.signIn)
 
 











export default router;
