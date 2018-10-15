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
     * @memberof Controls
     */
     

         static createOrders(req, res) {
             const sql = 'INSERT INTO orders (name, amount, quantity, deliveryAddress) VALUES ($1, $2, $3) returning *'
             const params = [req.body.name, req.body.amount, req.body.quantity, req.body.deliveryAssress]
             db.query(sql, params).then((ans)=>{
                 res.status(200).json({
                     status:'success',
                     message:'successfully added orders',
                     order:ans.rows
                 })
             }).catch((err)=>{
                 res.status(500).json({
                     status:'failed',
                     message:err.message
                 })
             })
         }
}