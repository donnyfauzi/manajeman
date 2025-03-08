const express = require("express")
const { createPengeluaran, getPengeluaran, getTotalDanaKeluar } = require('../controllers/c_pengeluaran')
const verifyToken = require('../midelwares/jwtToken')

const router = express.Router()

/**
 * @swagger
 * tags:
 *   - name: Pengeluaran
 *     description: Endpoints terkait pengeluaran
 */

/**
 * @swagger
 * /addPengeluaran:
 *   post:
 *     summary: Tambah pengeluaran
 *     tags: [Pengeluaran]
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
 *                 example: "2024-03-08"
 *               kategori:
 *                 type: string
 *                 example: "Makan"
 *               keterangan:
 *                 type: string
 *                 example: "Sarapan"
 *               dana_keluar:
 *                 type: number
 *                 example: 50000
 *     responses:
 *       200:
 *         description: Pengeluaran berhasil ditambahkan
 *       400:
 *         description: Request tidak valid
 *       401:
 *         description: Token tidak valid atau tidak diberikan
 *       500:
 *         description: Kesalahan server
 */
router.post('/addPengeluaran', verifyToken, createPengeluaran);

/**
 * @swagger
 * /getPengeluaran:
 *   get:
 *     summary: Ambil daftar pengeluaran
 *     tags: [Pengeluaran]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Data pengeluaran berhasil diambil
 *       401:
 *         description: Token tidak valid atau tidak diberikan
 *       500:
 *         description: Kesalahan server
 */
router.get('/getPengeluaran', verifyToken, getPengeluaran);

/**
 * @swagger
 * /getTotalPengeluaran:
 *   get:
 *     summary: Ambil total pengeluaran
 *     tags: [Pengeluaran]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Total pengeluaran berhasil diambil
 *       401:
 *         description: Token tidak valid atau tidak diberikan
 *       500:
 *         description: Kesalahan server
 */
router.get('/getTotalPengeluaran', verifyToken, getTotalDanaKeluar);


module.exports = router