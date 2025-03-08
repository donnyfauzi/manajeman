const express = require("express")
const { createPemasukan, getPemasukan, getTotalDanaMasuk } = require('../controllers/c_pemasukan')
const verifyToken = require('../midelwares/jwtToken')

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Pemasukan
 *   description: API endpoints untuk mengelola pemasukan
 */

/**
 * @swagger
 * /addPemasukan:
 *   post:
 *     summary: Tambah pemasukan baru
 *     tags: [Pemasukan]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tanggal:
 *                 type: string
 *                 format: date
 *                 example: "2025-03-08"
 *               keterangan:
 *                 type: string
 *                 example: "Pemasukan dari bisnis"
 *               dana_masuk:
 *                 type: number
 *                 example: 150000
 *     responses:
 *       200:
 *         description: Pemasukan berhasil ditambahkan
 *       400:
 *         description: Data tidak valid
 *       401:
 *         description: Token tidak valid atau tidak diberikan
 *       500:
 *         description: Terjadi kesalahan server
 */
router.post('/addPemasukan', verifyToken, createPemasukan);

/**
 * @swagger
 * /getPemasukan:
 *   get:
 *     summary: Ambil data pemasukan pengguna
 *     tags: [Pemasukan]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Data pemasukan berhasil diambil
 *       401:
 *         description: Token tidak valid atau tidak diberikan
 *       500:
 *         description: Terjadi kesalahan server
 */
router.get('/getPemasukan', verifyToken, getPemasukan);

/**
 * @swagger
 * /getTotalPemasukan:
 *   get:
 *     summary: Ambil total dana masuk pengguna
 *     tags: [Pemasukan]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Total dana masuk berhasil diambil
 *       401:
 *         description: Token tidak valid atau tidak diberikan
 *       500:
 *         description: Terjadi kesalahan saat mengambil total
 */
router.get('/getTotalPemasukan', verifyToken, getTotalDanaMasuk);


module.exports = router