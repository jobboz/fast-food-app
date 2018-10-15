
export default class foodValidate {

  static createOrderValidator(req, res, next) {
    const error = [];

    const { name, amount, quantity, deliveryAddress } = req.body;
    if (name === undefined || amount === undefined || quantity === undefined || deliveryAddress === undefined) {
      // return res.status(400)
      res.status(400)
        .send({
          status: 'failed',
          message: 'all or some field are undefined'
        });

    } else {

      if (name === '') {
        error.push('name must not be empty');
      } else {
        if (name.length > 20 || name.length < 3) {
          error.push('name must be between 3 and 20 charecters')
        }
      }
      //name ends here
      if (amount === '') {
        error.push('account must not be empty');
      } else {
        if (isNaN(amount)) {
          error.push('amount must be a number')
        }
      }
      //amount ends here

      if (quantity === '') {
        error.push('quantity must not be empty')
      } else {
        if (isNaN(quantity)) {
          error.push('quantity must be a number')
        }
      }
      //quantity ends here

      if (deliveryAddress === '') {
        error.push('deliveryAddress must not be empty')
      } else {
        if (deliveryAddress.length < 7) {
          error.push('deliveryAddress must not be less than 7 characters')
        }
      }

      if (error.length !== 0) {
        res.status(400)
          .send({
            errorMessage: error
          })
      } else {
        next();
      }

    }
  }

  static modifyOrderValidator(req, res, next) {
    const error = [];
    const { name, amount, quantity, deliveryAddress } = req.body;
      if (name) {
        if (name.length > 20 || name.length < 3) {
          error.push('name must be between 3 and 20 charecters')
        }
      }
      //name ends here
      if (amount) {
        if (isNaN(amount)) {
          error.push('amount must be a number')
        }
      }
      //amount ends here

      if (quantity) {
        if (isNaN(quantity)) {
          error.push('quantity must be a number')
        }
      }
      //quantity ends here

      if (deliveryAddress) {
        if (deliveryAddress.length < 7) {
          error.push('deliveryAddress must not be less than 7 characters')
        }
      }

      if (error.length !== 0) {
        return res.status(400)
          .send({
            errorMessage: error
          })
      }
      next();

  }
    
}