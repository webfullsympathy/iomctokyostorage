import mysql from 'mysql2/promise';

require('dotenv').config();

export const pool = mysql.createPool({
    host: process.env.SQL_HOST,
    port: Number(process.env.SQL_PORT),

    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    
    database: process.env.SQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
});
