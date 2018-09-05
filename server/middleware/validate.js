import validator from 'validator';

export default class foodValidate {

  static createFoodValidator(req, res, next) {
    const error = [];

    const { name, amount, quantity, deliveryAddress } = req.body;
    if (name === undefined || amount === undefined || quantity === undefined || deliveryAddress === undefined) {
     return res.status(400).send({
        status: 'bad request',
        message: 'all or some field are undefined'
      });

    } else {

      // 
 if (validator.isEmpty(name)) {
         error.push('name must not be empty');
} else {
 if (name.length > 20 || name.length < 3) {
         error.push('name must be between 3 and 20 charecters')
           //name ends here
 }else {    
  if(amount === ''){
         error.push('account must not be empty');
 }else {
  if(amount.length > 20 || amount.length < 3) {
          error.push('amount must be between 3 and 20 numbers')
        //amount ends here
 }else {
   if(quantity === '') {
            error.push('quantity must not be empty')
 }else{
   if(quantity.length > 20 || quantity.length < 3) {
            error.push('quantity must be between 3 and 20 numbers')
           //quantity ends here
 }else{
   if(deliveryAddress === '') {
             error.push('deliveryAddress must not be empty') 
 }else {
     if(deliveryAddress.length > 30  || deliveryAddress.length < 3 ) {
             error.push('deliveryAddress must be between 3 and 30 characters')
         }
           }
              }
                }
                   }
               }
              }
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








