const express = require("express")
const { createPengeluaran, getPengeluaran, getTotalDanaKeluar } = require('../controllers/c_pengeluaran')
const verifyToken = require('../midelwares/jwtToken')

const router = express.Router()

router.post('/addPengeluaran', verifyToken, createPengeluaran)
router.get('/getPengeluaran', verifyToken, getPengeluaran)
router.get('/getTotalPengeluaran', verifyToken, getTotalDanaKeluar)

module.exports = router