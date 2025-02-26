const express    = require('express')
const bodyParser = require('body-parser')
const cors       = require('cors')
const app        = express()
const port = 5500

require("dotenv").config();

app.use(bodyParser.json())
app.use(express.static('assets'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const r_users = require('./routes/r_users')
const r_protected = require('./routes/r_protected')
const r_pemasukan = require('./routes/r_pemasukan')

app.use(
  cors({
    origin: "http://localhost:3000", //Ini URL untuk frontend
    credentials: true,
  })
);



app.use('/api', r_users)
app.use('/api', r_protected)
app.use('/api', r_pemasukan)

app.listen(port, () => {console.log(`Server berjalan di http://localhost:${port}`)})