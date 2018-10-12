import db from './../models/db';
// import dotenv from 'dotenv';
// dotenv.config();

export default class Controls{

 static creatOrder(req, res) {
    //   const client = new Client();
    //   client.connect()
    // db.connect().then(() => {
      const sql = 'INSERT INTO users ( username, email,password ) VALUES($1, $2, $3) returning *'
         const params =[req.body.username, req.body.email, req.body.password]

         return db.query(sql,params)
         .then((ans)=>{
          res.send({
              myvalue:ans.rows
            })
            
      }).catch(err=> console.log(err))
      
     
    }
    static getAllOrders(req, res) {
const sql = 'SELECT * FROM users';
return db.query(sql).then((user)=>{
  if(user.rows.length < 1) {
res.status(200)
.json({
  message:'no foods available',
  
});
  }
  return res.status(200)
  .json({
    status: 'Success',
    message: `Successsfully retrieved all users orders with total of ${user.rows.length} user`,
    user: user.rows,
    userLeValue:user.rows.length,
 user: user,
  });

}).catch((err) => {
  res.status(500).json({
    status: 'Failed',
    message: err.message
  });
});
    }
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
   
}