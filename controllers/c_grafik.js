const { grafikPengeluaran, grafikPemasukan } = require('../models/m_grafik') 

const createGrafikPemasukan = async (req, res) => {
    try {
        const id_user = req.user.id
        
        // Ambil bulan & tahun dari query params, default ke bulan sebelumnya
        const today = new Date()
        let bulan = req.query.bulan ? parseInt(req.query.bulan) : today.getMonth()
        let tahun = req.query.tahun ? parseInt(req.query.tahun) : today.getFullYear()

        // Jika bulan Januari (0), maka set ke Desember tahun sebelumnya
        if (bulan === 0) {
            bulan = 12
            tahun -= 1
        }

        const data = await grafikPemasukan(id_user, bulan, tahun)
        return res.json({ bulan, tahun, data })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Terjadi kesalahan saat mengambil data grafik" })
    }
}

const createGrafikPengeluaran = async (req, res) => {
    try {
        const id_user = req.user.id
        
        // Ambil bulan & tahun dari query params, default ke bulan sebelumnya
        const today = new Date()
        let bulan = req.query.bulan ? parseInt(req.query.bulan) : today.getMonth()
        let tahun = req.query.tahun ? parseInt(req.query.tahun) : today.getFullYear()

        // Jika bulan Januari (0), maka set ke Desember tahun sebelumnya
        if (bulan === 0) {
            bulan = 12
            tahun -= 1
        }

        const data = await grafikPengeluaran(id_user, bulan, tahun)
        return res.json({ bulan, tahun, data })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Terjadi kesalahan saat mengambil data grafik" })
    }
}

module.exports = {createGrafikPengeluaran, createGrafikPemasukan}