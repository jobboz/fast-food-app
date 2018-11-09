import validaTOR from 'validator';

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
            if(username === undefined || email === undefined || password === undefined) {
                res.json({
                    message:'All or some field is/are undefined'
                });   j
            }
            if(!validator.isEmpty(username)) { 
                for(let i = 0; i < username.length; i += 1) {
                    if(validator.toInt(username[i])) {
                        errors.username = 'useer'
                    }
                }
            }
     }








 }