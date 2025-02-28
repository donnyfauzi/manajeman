const db = require('../config/database')

const pengeluaran = async (id_user, tanggal, keterangan, dana_keluar) => {
    const query = 'INSERT INTO pengeluaran (id_user, tanggal, keterangan, dana_keluar) VALUES (?, ?, ?, ?)'
    const values = [id_user, tanggal, keterangan, dana_keluar]
    const [result] = await db.promise().query(query, values)
    return { id: result.insertId, id_user, keterangan, dana_keluar }
}

const pengeluaranByUserId = async (id_user) => {
    const query = 'SELECT * FROM pengeluaran WHERE id_user = ?'
    const [result] = await db.promise().query(query, [id_user])
    return result
}

const totalDanaKeluar = async (id_user) => {
    const query = 'SELECT SUM(dana_keluar) AS total FROM pengeluaran WHERE id_user = ?'
    const result = await db.promise().query(query, [id_user])
    return result[0].total || 0
}

module.exports = {pengeluaran, pengeluaranByUserId, totalDanaKeluar}