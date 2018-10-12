import { Pool } from 'pg';
// import dotenv from 'dotenv';
// dotenv.config();
// require('dotenv').config()

//  const env = process.env.NODE_ENV || 'development';
// const config = configuration[env];

// const connectionStrin?g = config.url;
const connectionString = 'postgresql://postgres:jobboz@localhost:5432/foods'

const db = new Pool({connectionString});
db.connect().then(() => {
     console.log('successfully connected to postgresDB')
     console.log(connectionString);

}).catch((err) => {
    console.log(err.messsage);
})

export default db;
