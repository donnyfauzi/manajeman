const { pemasukan, pemasukanByUserId } = require('../models/m_pemasukan')

const createPemasukan = async (req, res) => {
    try {
        const { tanggal, keterangan, dana_masuk } = req.body
        const id_user = req.user.id;

        
        const result = await pemasukan(id_user, tanggal, keterangan, dana_masuk)
        
        res.json({ message: 'Pemasukan berhasil ditambahkan', id: result.id })
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({ message: 'Terjadi kesalahan server' })
    }
};

const getPemasukan = async (req, res) => {
    try {
        const id_user = req.user.id
        const results = await pemasukanByUserId(id_user)

        res.json(results)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

module.exports = { createPemasukan, getPemasukan }
