const express = require('express')
const {createGrafikPengeluaran, createGrafikPemasukan} = require('../controllers/c_grafik')
const verifyToken = require('../midelwares/jwtToken')

const router = express.Router()


/**
 * @swagger
 * tags:
 *   - name: Grafik
 *     description: Endpoint untuk mengambil data grafik pemasukan dan pengeluaran
 */

/**
 * @swagger
 * /grafikPemasukan:
 *   get:
 *     summary: Ambil data grafik pemasukan
 *     tags: [Grafik]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: bulan
 *         schema:
 *           type: integer
 *         description: Bulan dalam format angka (1-12), default ke bulan sebelumnya
 *       - in: query
 *         name: tahun
 *         schema:
 *           type: integer
 *         description: Tahun dalam format angka, default ke tahun sekarang
 *     responses:
 *       200:
 *         description: Data grafik pemasukan berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 bulan:
 *                   type: integer
 *                   example: 8
 *                 tahun:
 *                   type: integer
 *                   example: 2024
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       kategori:
 *                         type: string
 *                         example: "Gaji"
 *                       total:
 *                         type: integer
 *                         example: 5000000
 *       401:
 *         description: Token tidak valid atau tidak diberikan
 *       500:
 *         description: Kesalahan server
 */
router.get('/grafikPemasukan', verifyToken, createGrafikPemasukan);

/**
 * @swagger
 * /grafikPengeluaran:
 *   get:
 *     summary: Ambil data grafik pengeluaran
 *     tags: [Grafik]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: bulan
 *         schema:
 *           type: integer
 *         description: Bulan dalam format angka (1-12), default ke bulan sebelumnya
 *       - in: query
 *         name: tahun
 *         schema:
 *           type: integer
 *         description: Tahun dalam format angka, default ke tahun sekarang
 *     responses:
 *       200:
 *         description: Data grafik pengeluaran berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 bulan:
 *                   type: integer
 *                   example: 8
 *                 tahun:
 *                   type: integer
 *                   example: 2024
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       kategori:
 *                         type: string
 *                         example: "Makanan"
 *                       total:
 *                         type: integer
 *                         example: 2000000
 *       401:
 *         description: Token tidak valid atau tidak diberikan
 *       500:
 *         description: Kesalahan server
 */
router.get('/grafikPengeluaran', verifyToken, createGrafikPengeluaran);



module.exports = router
