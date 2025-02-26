const express = require("express")
const { createPemasukan, getPemasukan } = require('../controllers/c_pemasukan')
const verifyToken = require('../midelwares/jwtToken')

const router = express.Router()

router.post('/addPemasukan', verifyToken, createPemasukan)
router.get('/getPemasukan', verifyToken, getPemasukan)

module.exports = router