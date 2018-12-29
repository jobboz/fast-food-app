import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
// import nodemailer from 'nodemailer';
import db from './../models/db'

dotenv.config();

// cloudinary.config({
// api_secret: process.env.API_Secret
// });
/**
 * @export
 * @class UsersController
 */
class UsersController {
    /**
     * @param {obj} req
     * @param {obj} res
     * @memberof UsersController
     *  @returns {obj} insertion error messages or success message
     */
     signUp(req, res) {
       const {username, email} = req.body;
       const hashedPassword =  bcrypt.hashSync(req.body.password, 10);
       db.query(`SELECT id FROM users WHERE email='${email}'`)
       .then((userfound)=>{
           if(userfound.rows.length > 0) {
               res.status(409).json({
                   status:'Failed',
                   message:'user already exist'
               });
           }
           const sql = 'INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING *';
           const params = [username, email, hashedPassword]
           db.query(sql, params)
           .then((users)=>{
               const payload = {
                   username:username,
               }
               const token = jwt.sign(payload, process.env.SECRET_KEY,{
                   //this basically sign the given caterials(payload, secrete-key) into a jwt string
                   expiresIn: 60 * 60 * 10 //10 hours
               });
                req.token = token;
               res.status(201).json({
                   status:'success',
                   message:'successfully created users account',
                   data:users.rows[0],
                   token,
                   

               })

           }).catch((err) =>{
              res.status(500).json({
                   status:'failed',
                   message:err.message
               })
           }).catch(err => res.status(500).json({
                    status:'failed',
                    message:err.message
           }));
       })
    }
      signIn(req, res){
        const{username, password} = req.body;
        
        const sql = `SELECT * FROM users WHERE username = '${username}'`;
        db.query(sql).then((result)=>{
            if(result.rows.length > 0) {
            const verifyPassword = bcrypt.compareSync(password, result.rows[0].password);
             if(verifyPassword) {
                 const payload = {
                     username:result.rows[0].username,
                     role:result.rows[0].role,

                 };
                 //authentication server
                 const token = jwt.sign(payload, process.env.SECRET_KEY,{ //asymmentric algorithm
                    //we also have symmetric algorithm
                      expiresIn: 60 * 60 * 10 // 10 hours
                 });
                 req.token = token;
                 res.status(201).json({ 
                    status:'success',
                    message:'successfully login',
                    data:{
                        username:result.rows[0].username,
                        email:result.rows[0].email
                },
                    token
                })
             }
            }
            res.status(400).json({
                status:'failed',
                message:'invalid username or password',
                
            });
        }).catch((err) =>{
            res.status(500).json({
                status:'failed',
                message:err.message
            })
        }) 
         
    }
    
}
export default new UsersController();
