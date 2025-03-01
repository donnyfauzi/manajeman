const db = require('../config/database')

const subtotal = async (id_user) => {
    const query =` 
        SELECT 
        COALESCE((SELECT SUM(dana_masuk) FROM pemasukan WHERE id_user = ?), 0) 
        - 
        COALESCE((SELECT SUM(dana_keluar) FROM pengeluaran WHERE id_user = ?), 0) 
        AS subtotal
    `
    const [result] = await db.promise().query(query, [id_user, id_user])
    return result[0].subtotal || 0
}

module.exports = subtotal