const express = require("express")
const {createProfile, getProfileById, updateProfileByUserId} = require('../controllers/c_profile')
const verifyToken = require('../midelwares/jwtToken')

const router = express.Router()

/**
 * @swagger
 * tags:
 *   - name: Profile
 *     description: Endpoints terkait profile pengguna
 */

/**
 * @swagger
 * /createProfile:
 *   post:
 *     summary: Tambah profil pengguna
 *     tags: [Profile]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nama_lengkap:
 *                 type: string
 *                 example: "John Doe"
 *               about:
 *                 type: string
 *                 example: "Software Engineer"
 *               alamat:
 *                 type: string
 *                 example: "Jl. Sudirman No. 123, Jakarta"
 *               no_tlp:
 *                 type: string
 *                 example: "081234567890"
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               pekerjaan:
 *                 type: string
 *                 example: "Programmer"
 *               foto:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profil berhasil ditambahkan
 *       400:
 *         description: Request tidak valid
 *       401:
 *         description: Token tidak valid atau tidak diberikan
 *       500:
 *         description: Kesalahan server
 */
router.post('/createProfile', verifyToken, createProfile);

/**
 * @swagger
 * /getProfile:
 *   get:
 *     summary: Ambil profil pengguna
 *     tags: [Profile]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Data profil berhasil diambil
 *       401:
 *         description: Token tidak valid atau tidak diberikan
 *       404:
 *         description: Profil tidak ditemukan
 *       500:
 *         description: Kesalahan server
 */
router.get('/getProfile', verifyToken, getProfileById);

/**
 * @swagger
 * /updateProfile:
 *   put:
 *     summary: Perbarui profil pengguna
 *     tags: [Profile]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nama_lengkap:
 *                 type: string
 *                 example: "John Doe"
 *               about:
 *                 type: string
 *                 example: "Software Engineer"
 *               alamat:
 *                 type: string
 *                 example: "Jl. Sudirman No. 123, Jakarta"
 *               no_tlp:
 *                 type: string
 *                 example: "081234567890"
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               pekerjaan:
 *                 type: string
 *                 example: "Programmer"
 *               foto:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profil berhasil diperbarui
 *       400:
 *         description: Request tidak valid atau tidak ada perubahan
 *       401:
 *         description: Token tidak valid atau tidak diberikan
 *       404:
 *         description: Profil tidak ditemukan
 *       500:
 *         description: Kesalahan server
 */
router.put('/updateProfile', verifyToken, updateProfileByUserId);



module.exports = router
