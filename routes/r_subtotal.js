const express = require("express")
const getSubtotal = require('../controllers/c_subtotal')
const verifyToken = require('../midelwares/jwtToken')

const router = express.Router()

/**
 * @swagger
 * tags:
 *   - name: Subtotal
 *     description: Endpoint untuk mengambil subtotal total transaksi pengguna
 */

/**
 * @swagger
 * /getSubtotal:
 *   get:
 *     summary: Ambil subtotal total transaksi pengguna
 *     tags: [Subtotal]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Total subtotal berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: number
 *                   example: 100000
 *       401:
 *         description: Token tidak valid atau tidak diberikan
 *       500:
 *         description: Kesalahan server
 */
router.get('/getSubtotal', verifyToken, getSubtotal);

module.exports = router