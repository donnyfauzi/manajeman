const express = require('express')
const {createGrafikPengeluaran, createGrafikPemasukan} = require('../controllers/c_grafik')
const verifyToken = require('../midelwares/jwtToken')

const router = express.Router()


router.get('/getGrafikPemasukan', verifyToken, createGrafikPemasukan)
router.get('/getGrafikPengeluaran', verifyToken, createGrafikPengeluaran)

module.exports = router
