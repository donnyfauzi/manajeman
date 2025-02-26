const express    = require('express')
const bodyParser = require('body-parser')
const cors       = require('cors')
const app        = express()
const port = 5000

require("dotenv").config();

app.use(bodyParser.json())
app.use(express.static('assets'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const r_users = require('./routes/r_users')
const r_dashboard = require('./routes/r_dashboard')

app.use(
  cors({
    origin: "http://localhost:5000", // Ganti dengan URL frontend Anda
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);



app.use('/api', r_users)

app.use('/api', r_dashboard)

app.listen(port, () => {console.log(`Server berjalan di http://localhost:${port}`)})