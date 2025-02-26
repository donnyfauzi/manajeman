const db = require('../config/database')

const pemasukan = async (id_user, tanggal, keterangan, dana_masuk) => {
    const query = 'INSERT INTO pemasukan (id_user, tanggal, keterangan, dana_masuk) VALUES (?, ?, ?, ?)'
    const values = [id_user, tanggal, keterangan, dana_masuk]
    const [result] = await db.promise().query(query, values)
    return {id: result.insertId, id_user, tanggal, keterangan, dana_masuk }
}

const pemasukanByUserId = async (id_user) => {
    const query = 'SELECT * FROM pemasukan WHERE id_user = ?'
    const [result] = await db.promise().query(query, [id_user])
    return result
}

module.exports = {pemasukan, pemasukanByUserId}
