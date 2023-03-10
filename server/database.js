const dotenv = require('dotenv');
dotenv.config();

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// kết nối đến database
connection.connect(function(err) {
  if (err) {
    console.error('Lỗi kết nối đến database: ' + err.stack);
    return;
  }
  console.log('Kết nối đến database thành công!');
});


// Create Connection Pool
const connection_pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

module.exports = connection_pool;