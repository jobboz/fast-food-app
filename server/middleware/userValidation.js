import validator  from 'validator';

/**
 * Validates Signup and Singnin post requests
 * @class UserValidation
 */

 class UserValidation {
/**
 * validates signup
 * @param {obj} req
 * @param {obj} res
 * @param {obj} next
 * @memberof UserValidation
 * @returns {obj} validation error messages object or contents of request.body object
 */
     signUP(req, res, next) {
            const {  username, email, password  } = req.body;
            const errors = {};
            if(username === undefined || email === undefined || password === undefined) {``
                res.json({
                    message:'All or some field is/are undefined'
                });   
            }
            if(!validator.isEmpty(username)) { 
                for(let i = 0; i < username.length; i += 1) {
                    if(validator.toInt(username[i])) {
                        errors.username = 'username must not contain numbers'
                    }
                }
            }else {
                errors.username = 'username is required';
             }if(!validator.isEmpty(username)) {

             if(!validator.isLength(username, {min: 2, max: 15})) {
                 errors.username = 'username must be between  2 to 100 characters';
             }
            }  else { errors.username = 'username is required'; }

            if (!validator.isEmpty(email)) {
              if (!validator.isEmail(email)) {
                errors.email = 'Enter a valid email address';
              }
            } else { errors.email = 'email is required'; }
            if (!validator.isEmpty(password)) {
              if (!validator.isLength(password, { min: 8 })) {
                errors.password = 'password must be eight character or more';
              }
            } else { errors.password = 'password is required'; }

            if (Object.keys(errors).length !== 0) {
              return res.status(400).json({ errors });
            }
            next();
          }
        
          /**
          * Validates signup
          * @param {obj} req
          * @param {obj} res
          * @param {obj} next
          * @memberof UserValidation
          * @returns {obj} validation error messages object or contents of request.body object
         */
          signIn(req, res, next) {
            const { username, password } = req.body;
            const errors = {};
            if (username === undefined || password === undefined) {
              return res.status(400)
                .json({
                  message: 'All or some of the field is/are undefined'
                });
            }
        
            if (!validator.isEmpty(username)) {
              if (!validator.isLength(username, { min: 2, max: 100 })) {
                errors.username = 'username must be between 2 to 100 characters';
              }
            } else { errors.username = 'username  is required'; }
            if (!validator.isEmpty(password)) {
              if (!validator.isLength(password, { min: 8 })) {
                errors.password = 'password must be eight character or more';
              }
            } else { errors.password = 'password  is required'; }
            if (Object.keys(errors).length !== 0) {
              return res.status(400).json({ errors });
            }
            next();
          }
     

 }

 export default new  UserValidation;