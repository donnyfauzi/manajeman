const express = require('express')
const { formLogin, formRegister, registerUser, loginUser } = require('../controllers/c_users')

const router = express.Router()

router.get('/', formLogin)
router.get('/register', formRegister)
router.post('/proses-register', registerUser)
router.post('/proses-login', loginUser)




module.exports = router