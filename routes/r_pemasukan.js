const express = require("express")
const { createPemasukan, getPemasukan, getTotalDanaMasuk } = require('../controllers/c_pemasukan')
const verifyToken = require('../midelwares/jwtToken')

const router = express.Router()

router.post('/addPemasukan', verifyToken, createPemasukan)
router.get('/getPemasukan', verifyToken, getPemasukan)
router.get('/getTotalPemasukan', verifyToken, getTotalDanaMasuk)

module.exports = router