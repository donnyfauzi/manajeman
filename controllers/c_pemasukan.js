const { pemasukan, pemasukanByUserId, totalDanaMasuk } = require('../models/m_pemasukan')

const createPemasukan = async (req, res) => {
    try {
        const { tanggal, keterangan, dana_masuk } = req.body
        const id_user = req.user.id

        if (!tanggal || !keterangan || !dana_masuk) {
            return res.status(400).json({ message: 'Semua kolom harus diisi' })
        }

        if (dana_masuk < 100000) {
            return res.status(400).json({ message: 'Masukan nominal yang valid' })
        }

        if (keterangan.length > 20) {
            return res.status(400).json({ message: 'Keterangan maksimal 20 karakter' })  
        }

        
        const result = await pemasukan(id_user, tanggal, keterangan, dana_masuk)
        
        return res.json({ message: 'Pemasukan berhasil ditambahkan', id: result.id })
    } catch (error) {
        console.error('Error:', error)
        return res.status(500).json({ message: 'Terjadi kesalahan server' })
    }
}

const getPemasukan = async (req, res) => {
    try {
        const id_user = req.user.id
        const results = await pemasukanByUserId(id_user)

        return res.json({message:'success get pemasukan', results })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getTotalDanaMasuk = async (req, res) => {
    try {
        const id_user = req.user.id;
        const total = await totalDanaMasuk(id_user)
        return res.json({total})
    } catch (error) {
        return res.status(500).json({ message: "Terjadi kesalahan saat mengambil total " })
    }
}

module.exports = { createPemasukan, getPemasukan, getTotalDanaMasuk }
