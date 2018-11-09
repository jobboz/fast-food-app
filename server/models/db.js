import { Pool } from 'pg';
  require('dotenv').config();


const{ connectionString} = process.env;
const db = new Pool({connectionString});
db.connect().then(() => {
  
     console.log('successfully connected to postgresDB')
     console.log(connectionString);

}).catch((err) => {
    console.log(err.messsage);
})

export default db;
