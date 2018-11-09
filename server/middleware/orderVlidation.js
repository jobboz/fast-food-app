import { isNumber } from "util";

// import validatior from 'validator';
/**
 * validates POST and PUT requests for orders route
 * @class OrdersValidation
 * 
 */


class OrderValidation{
    /**
     * validates addOrders before allowing access to controller class
     * @param {obj} req
     * @param {obj} res
     * @param {obj} next
     * @memberOf OrderValidation
     * @returns {obj} validation error messages object or contents of request.body object
     */

       createOrderValidator(req, res, next) {
        const error = [];
    
        const { name, amount, quantity, deliveryAddress } = req.body;
        if (name === undefined || amount === undefined || quantity === undefined || deliveryAddress === undefined) {
          // return res.status(400)
          res.status(400)
            .json({
              status: 'failed',
              message: 'all or some field are undefined'
            });
    
        } else {
    
          if (name === '') {
            error.push('name is required');
          } else {
            if (name.length > 20 || name.length < 3) {
              error.push('name must be between 3 and 20 charecters')
            }
          }
          //name ends here
          if (amount === '') {
            error.push('amount is required');
          } else {
            if (isNaN(amount)) {
              error.push('amount must be a number')
            }
          }
          //amount ends here
    
          if (quantity === '') {
            error.push('quantity is required')
          } else {
            if (isNaN(quantity)) {
              error.push('quantity must be a number')
            }
          }
          //quantity ends here
    
          if (deliveryAddress === '') {
            error.push('deliveryAddress is required')
          } else {
            if (deliveryAddress.length < 7) {
              error.push('deliveryAddress must not be less than 7 characters')
            }
          }
    
          if (error.length !== 0) {
            res.status(400)
              .json({
                errorMessage: error
              })
          } else {
            next();
          }
    
        }
      }
    
        modifyOrderValidator(req, res, next) {
        const error = [];
        const { name, amount, quantity, deliveryAddress } = req.body;
        if (name === undefined || amount === undefined || quantity === undefined || deliveryAddress === undefined) {
          // return res.status(400)
          res.status(400)
            .json({
              status: 'failed',
              message: 'all or some field are undefined'
            });
    
        } else {
    
          if (name === '') {
            error.push('name is required');
          } else {
            if (name.length > 20 || name.length < 3) {
              error.push('name must be between 3 and 20 charecters')
            }
          }
          //name ends here
          if (amount === '') {
            error.push('amount is required');
          } else {
            if (isNaN(amount)) {
              error.push('amount must be a number')
            }
          }
          //amount ends here
    
          if (quantity === '') {
            error.push('quantity is required')
          } else {
            if (isNaN(quantity)) {
              error.push('quantity must be a number')
            }
          }
          //quantity ends here
    
          if (deliveryAddress === '') {
            error.push('deliveryAddress is required')
          } else {
            if (deliveryAddress.length < 7) {
              error.push('deliveryAddress must not be less than 7 characters')
            }
          }
    
          if (error.length !== 0) {
            res.status(400)
              .json({
                errorMessage: error
              })
          } else {
            next();
          }
    
        }
      }
    
}     //exported to be re-used
export default new OrderValidation();
