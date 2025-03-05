const express = require("express")
const {createProfile, getProfileById, updateProfileByUserId} = require('../controllers/c_profile')
const verifyToken = require('../midelwares/jwtToken')

const router = express.Router()

router.post('/createProfile', verifyToken, createProfile)
router.get('/getProfile', verifyToken, getProfileById)
router.put('/updateProfile', verifyToken, updateProfileByUserId)

module.exports = router
