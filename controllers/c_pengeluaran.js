const { pengeluaran, pengeluaranByUserId, totalDanaKeluar } = require('../models/m_pengeluaran')

const createPengeluaran = async (req, res) => {
    try {
        const { tanggal, kategori, keterangan, dana_keluar } = req.body
        const id_user = req.user.id

        if (!tanggal || !kategori || !keterangan || !dana_keluar) {
            return res.status(400).json({ message: 'Semua kolom harus diisi' })
        }

        if (dana_keluar < 100000) {
            return res.status(400).json({ message: 'Masukan nominal yang valid' })
        }

        if (keterangan.length > 20) {
            return res.status(400).json({ message: 'Keterangan maksimal 20 karakter' })  
        }

        const result = await pengeluaran(id_user, tanggal, kategori, keterangan, dana_keluar)
        return res.json({ message: 'Pengeluaran berhasil ditambahkan', id: result.id })

    } catch (error) {
        console.error('Error:', error)
        return res.status(500).json({ message: 'Terjadi kesalahan server' })
    }
}

const getPengeluaran = async (req, res) => {
    try {
        const id_user = req.user.id
        const results = await pengeluaranByUserId(id_user)

        return res.json(results)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getTotalDanaKeluar = async (req, res) => {
    try {
        const id_user = req.user.id;
        const total = await totalDanaKeluar(id_user)
        return res.json({total})
    } catch (error) {
        return res.status(500).json({ message: "Terjadi kesalahan saat mengambil total " })
    }
}

module.exports = { createPengeluaran, getPengeluaran, getTotalDanaKeluar }
