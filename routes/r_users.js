const express = require('express')
const { registerUser, loginUser } = require('../controllers/c_users')

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)

/**
 * @swagger
 * /register:
 *   post:
 *     tags:
 *       - Register
 *     summary: Register user
 *     description: Creates a new user account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - confirmPassword
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *               confirmPassword:
 *                 type: string
 *                 format: password
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - Login
 *     summary: Login user
 *     description: Authenticate user and return a JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Successful login
 *       400:
 *         description: Invalid email or password
 *       500:
 *         description: Internal server error
 */



module.exports = router