import express from 'express';
import Control from './../controllers/mycontrl'
import userValidator from './../middleware/userValidator'
import orderController from './../controllers/orderController'
import UserController from './../controllers/usersController'
import orderValidator from './../middleware/orderVlidation'
 import  authToken from './../middleware/authToken'
import verifyAdmin from './../middleware/verifyAdmin'
import Svalidation from './../middleware/userValidation'
const router = express.Router();


//users rote
router.route('/users')
 .post(authToken, userValidator.addUserValidation, Control.creatUsers)
 .get(authToken, Control.getAllUsers);

 router.route('/users/:id')
 .get(authToken, Control.getSpecificOrders)
 .put(authToken, userValidator.modifyUserValidation, Control.modifyOrders)
 .delete(authToken, Control.deleteOrder)


 //orders route
 
router.route('/orders')
.post(authToken,verifyAdmin.verifyIfAdmin, orderValidator.createOrderValidator, orderController.createOrders)
.get(authToken, orderController.getAllOrders)

router.route('/orders/:id')
.get(authToken, orderController.getSpecificOrder)
.put(authToken, orderValidator.modifyOrderValidator, orderController.ModifyOrder)
.delete(authToken, orderController.deleteOrder)
// //user signup and signin
 router.route('/signup')
 .post(Svalidation.signUP, UserController.signUp)

 router.route('/signin')
 .post(Svalidation.signIn, UserController.signIn)
 
 











export default router;
