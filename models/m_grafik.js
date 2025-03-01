const db = require('../config/database')

const grafikPemasukan = async (id_user, bulan, tahun) => {
    const query = `
        SELECT 
            DAY(tanggal) AS tanggal,
            SUM(dana_masuk) AS total_pemasukan
        FROM pemasukan
        WHERE id_user = ? 
        AND MONTH(tanggal) = ? 
        AND YEAR(tanggal) = ?
        GROUP BY DAY(tanggal)
        ORDER BY tanggal ASC
    `
    const [result] = await db.promise().query(query, [id_user, bulan, tahun])
    return result
}

const grafikPengeluaran = async (id_user, bulan, tahun) => {
    const query = `
        SELECT 
            DAY(tanggal) AS tanggal,
            SUM(dana_keluar) AS total_pengeluaran
        FROM pengeluaran
        WHERE id_user = ? 
        AND MONTH(tanggal) = ? 
        AND YEAR(tanggal) = ?
        GROUP BY DAY(tanggal)
        ORDER BY tanggal ASC
    `
    const [result] = await db.promise().query(query, [id_user, bulan, tahun])
    return result
}

module.exports = { grafikPengeluaran, grafikPemasukan }