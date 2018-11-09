import db from './../models/db';
/**
* @export
* @class Controls
*/

export default class Controls{
  /**
   * @param {obj} req
   * @param {obj} res
   * @returns {obj} insertion error messages or success messages
   * @memberof Controls
   */

 static creatUsers(req, res) {
    //   const client = new Client();
    //   client.connect()
    // db.connect().then(() => {
      const sql = 'INSERT INTO users ( username, email,password ) VALUES($1, $2, $3) returning *'
         const params =[req.body.username, req.body.email, req.body.password]

         return db.query(sql,params)
         .then((ans)=>{
          res.status(200).json({
            status:'success',
            message:'successfully added new user',
            myvalue:ans.rows
            })
            
      }).catch((err) =>
      res.status(500).json({
        status:'failed',
        message:err.message
      }));
      
     
    }
     /**
     * Get all users from the user model
     * @param {obj} req
     * @param {obj} res
     * @returns {obj} insertion error messages or success messages
     * @memberof Controls
     */
    static getAllUsers(req, res) {
const sql = 'SELECT * FROM users';
return db.query(sql).then((user)=>{
  if(user.rows.length < 1) {
res.status(200)
.json({
  message:'no users available',
  
});
  }
  return res.status(200)
  .json({
    status: 'Success',
    message: `Successsfully retrieved all users orders with total of ${user.rows.length} user`,
    user: user.rows,
    userValue:user.rows.length,
  });

}).catch((err) => {
  res.status(500).json({
    status: 'Failed',
    message: err.message
  });
});
    }
     /**
     * Get a particular user from the user model
     * @param {obj} req
     * @param {obj} res
     * @returns {obj} insertion error messages or success messages
     * @memberof Controls
     */
   static getSpecificOrders(req, res) {
        const{ id } = req.params;
        const sql = 'SELECT * FROM users WHERE id = $1',
        param = [id];
      return db.query(sql, param).then((result) => {
        if(result.rowCount === 0) {
          return res.status(404)
          .json({
            status:'failed',
            message: 'The User with the given id was not found' 
          });
        } 
        return res.status(200)
        .json({
          status:'success',
          message:'successfully retrived user',
          data:result.rows[0]
        });


      }).catch((err)=>{
        res.status(500).json({
          status:'failed',
          message:err.message
        });
      });

   }
    /**
     * Modify a particular user from the user model
     * @param {obj} req
     * @param {obj} res
     * @returns {obj} insertion error messages or success messages
     * @memberof Controls
     */
   static modifyOrders(req, res) {
     const { username, email, password} = req.body, 
     { id } = req.params;
     const sql = 'UPDATE users SET username = $1, email=$2, password = $3 WHERE id =$4';
      const params = [username,email,password, id];
      db.query(sql,params).then((result)=>{
       if(result.rowCount === 0){
        return res.status(404)
         .json({
           status:'failed',
           message:'user id does not exist',
         });
       }
       return res.status(200).json({
         status:'success',
         message:'successfully updated an order',
          data: {
            id : id,
            username,
            email,
            password
          }
       }).catch((err)=>{
        return res.status(500).json({
          status:'failed',
          message:err.message
        });
      });


     })

   }
    /**
     * Deletes a particular user from the user model
     * @param {obj} req
     * @param {obj} res
     * @returns {obj} insertion error messages or success messages
     * @memberof Controls
     */
   static deleteOrder(req, res){
     const {id} = req.params;
    const sql = 'DELETE FROM users WHERE id = $1';
    const  params = [id];
    db.query(sql, params).then((result)=>{
      if(result.rowCount === 0) {
        return res.status(404).json({
          status:'failed',
          message:'user with the given id does not exist'
        });

      }
      res.status(200).json({
        status:'success',
        message:'successfully deleted user',
        data:result.rows[0]
        
      })
    }).catch((err) =>
       res.status(500).json({
         status:'failed',
         message:err.message
       }));
    
   }
}