// import validatior from 'validator';
/**
 * validates POST and PUT requests for users route
 * @class UserValidation
 * 
 */


 class UserValidation{
     /**
      * validates addUsers before allowing access to controller class
      * @param {obj} req
      * @param {obj} res
      * @param {obj} next
      * @memberOf UserValidation
      * @returns {obj} validation error messages object or contents of request.body object
      */

      addUserValidation(req, res, next) {
           const {username, email, password} = req.body
          const errors = [];
           if(username === undefined || email === undefined || password === undefined) {
               res.status(400).json({

                   message:'All or some field is/are undefined'
               });  
           }
           //checking if username is empty
if(username === '') {
     errors.push('username is required')
     }else {
    if(username.length > 20 || username.length < 3) {
         errors.push('username must be between 3 and 20 characters')
          }
             }
             //checking if email is empty
     if(email === '') {
         errors.push('email is required')
     }else {
         if(email.length > 30 || email.length < 3) {
         errors.push('user email must not be between 3 and 30 characters')
         }
     }
     //checking if password is empty
     if(password === '') {
         errors.push('password is required')
     }else {
         if(password.length > 20 || password.length < 3) {
             errors.push('user password must be between 3 and 20 characters')
         }
     }

       //check if the errors object is empty
         if(Object.keys(errors).length !== 0) {
             res.status(400).json({
                 errorMessage: errors
             })
         }
         next();
      }
      
       modifyUserValidation(req, res, next) {
        const errors = [];
        const { username, email, password } = req.body;
        if(username === undefined || email === undefined || password === undefined) {
            res.status(404).json({
                message:'All or some field is/are undefined'
            })
        }   
         if(username.length > 40 || username.length < 3) {
            errors.push('name must be between 3 to 40 characters')
             }else { 
              if(email.length > 40 || email.length < 3) {
                errors.push('user email must be between 3 to 40 characters')
                }else {
                    if(password.length > 40 || password < 3) {

                     errors.push('password must be between 3 to 40 characters')
                    }
                }
            } 
            if(Object.keys(errors).length !== 0) {
                res.status(400).json({
                    errorMessage: errors
                })
            }
            next();
     }
    
}     //exported to be re-used
export default new UserValidation();
