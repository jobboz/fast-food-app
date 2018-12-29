class verifyAdmin {
         static verifyIfAdmin(req, res, next) {
            const { role } = req.authData;
            if(!role) { 
                res.json({
                    status: 'fail',
                    message:'Unauthourized access. Unknown entity!',
                });
                console.log('sssssss1',role)

            } else if (role != 'admin') {
                res.status(403).json({
                    status: 'fail',
                    message:'Unauthorized access to this resources'
                });
                
                console.log('sssssss2',role)

            }
            next();
         }
      }
      export default verifyAdmin; 