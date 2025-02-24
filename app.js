const express    = require('express')
const bodyParser = require('body-parser')
const cors       = require('cors')
const app        = express()
const port = 5000

require("dotenv").config();

app.use(bodyParser.json())
app.use(express.static('assets'))
app.use(express.json())


app.set('view engine', 'ejs')
app.set('views', './views')

const r_users = require('./routes/r_users')
const r_dashboard = require('./routes/r_dashboard')

app.use(
  cors({
    origin: "http://localhost:5000", // Sesuaikan dengan URL frontend
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);


app.use('/', r_users)
app.use('/register', r_users)
app.use('/proses-register', r_users)
app.use('/proses-login', r_users)

app.use('/', r_dashboard)

app.listen(port, () => {console.log(`Server berjalan di http://localhost:${port}`)})