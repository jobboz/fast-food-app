import db from './../models/db'

/**
* @export
* @class OrderControls
*/

export default class OrderControls{
    /**
     * @param {obj} req
     * @param {obj} res
     * @returns {obj} insertion error messages or success messages
     * @memberof OrderControls
     */
     

         static createOrders(req, res) {
              const {name, amount,quantity, deliveryAddress} = req.body;
              const date = req.body.date || new Date();
            //  const userid = req.decoded;
           
             const sql = 'INSERT INTO orders ( name, amount, quantity, deliveryAddress,date) VALUES($1, $2, $3, $4, $5) returning *'
             const params = [name, amount, quantity, deliveryAddress, date];
             db.query(sql, params).then((ans) => {
                 res.status(200).json({
                     status:'success',
                     message:'successfully added orders',
                     order:ans.rows
                 })
             }).catch((err)=> {
                 res.status(500).json({
                     status:'failed',
                     message:err.message
                     
                 })
             })
           
         }
          /**
     * Get all orders from the orders model
     * @param {obj} req
     * @param {obj} res
     * @returns {obj} insertion error messages or success messages
     * @memberof OrderControls
     */
         static getAllOrders(req, res) {
             const sql = 'SELECT * FROM orders';
             db.query(sql).then((orders)=>{
                 if(orders.length < 1) {
                     res.status(200).json({
                         message:'no orders available'
                     })
                 }
                 res.status(200).json({
                     status:'success',
                     message:`successfully retrived all orders with total of ${orders.rows.length} orders`,
                     orders:orders.rows,


                 })

             }).catch((err) =>{
                res.status(500).json({
                    status:'failed',
                    message:err.message
                })
            })

         }
          /**
         * Get specific orders from the orders model
         * @param {obj} req
         * @param {obj} res
         * @returns {obj} insertion error messages or success messages
         * @memberof OrderControls
         */
        static getSpecificOrder(req, res) {
            const{ id } = req.params;
            const sql = 'SELECT * FROM orders WHERE id =$1';
             const params = [id]
            db.query(sql, params).then((order)=>{
                if(order.rowCount === 0) {
                   res.status(404).json({
                        status:'failed',
                        message:'The order with the given id was not found'
                    })
                }
               res.status(200).json({
                    status:'success',
                    message:'successfully retrived order',
                    data:order.rows[0]

                })
            }).catch((err) =>{
              res.status(500).json({
                  status:'failed',
                  message:err.message
               })
            })
        }
         /**
     * Modify a particular user from the user model
     * @param {obj} req
     * @param {obj} res
     * @returns {obj} insertion error messages or success messages
     * @memberof Controls
     */
    static ModifyOrder(req, res){
        const {name,amount,quantity,deliveryAddress} = req.body
        const {id} = req.params
        const sql = 'UPDATE orders SET name=$1, amount=$2, quantity=$3, deliveryAddress=$4 WHERE id=$5';
        const params = [name,amount,quantity,deliveryAddress, id]
        db.query(sql, params).then((result)=>{
            if(result.rowCount===0) {
                res.status(404).json({
                    status:'failed',
                    message:'order id does not exist'
                })
            }
                 res.status(200).json({
                     status:'success',
                     message:'successfully updated order',
                     data:{
                         id:id,
                         name,
                         amount,
                         quantity,
                         deliveryAddress
                     }
                 }).catch((err) =>{
                     res.status(500).json({
                         status:'failed',
                         message:err.message
                     })
                 })
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
        const{ id } = req.params;
        const sql = 'DELETE FROM orders WHERE id =$1';
         const params = [id]
        db.query(sql, params).then((order)=>{
            if(order.rowCount === 0) {
               res.status(404).json({
                    status:'failed',
                    message:'The order with the given id was not found'
                })
            }
           res.status(200).json({
                status:'success',
                message:'successfully deleted order',
                data:order.rows[0]

            })
        }).catch((err) =>{
          res.status(500).json({
              status:'failed',
              message:err.message
           })
        })
    


    }
}