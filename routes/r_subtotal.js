const express = require("express")
const getSubtotal = require('../controllers/c_subtotal')
const verifyToken = require('../midelwares/jwtToken')

const router = express.Router()

router.get('/getSubtotal', verifyToken, getSubtotal)

module.exports = router