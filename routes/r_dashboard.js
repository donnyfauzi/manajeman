const express = require('express')
const { dashboard } = require('../controllers/c_dashboard')
const verifyToken = require("../midelwares/jwtToken");

const router = express.Router()

router.get('/dashboard',dashboard)

module.exports = router