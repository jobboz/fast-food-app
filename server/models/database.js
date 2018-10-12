import { Client } from 'pg';
require('dotenv').config()

const client = new Client();
client.connect();


const table = () => {
const myquery = `
DROP TABLE IF EXISTS orders CASCADE;

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE  IF NOT EXISTS users (

    id serial primary key,

    username varchar(150) not null,

    email varchar(255) not null,

    password varchar(255) not null,

    role text default 'user'

);

CREATE TABLE  IF NOT EXISTS orders (

    id serial primary key,
    
    userid integer references users(id) on delete cascade,
    
    name varchar(150),
    
    amount integer,
    
    quantity integer,
    
    deliveryAddress varchar(150),
    
    date date not null default now()
    )`;
 client.query(myquery,(err)=>{
        if(err){
        console.log(err);
        }
        client.end()
    })
}


table();