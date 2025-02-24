require('dotenv').config()
const mysql = require('mysql2')

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err)
    process.exit(1)
  }
  console.log('Connected to MySQL Database')
})

module.exports = db
