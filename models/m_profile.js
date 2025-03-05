const db = require('../config/database')

const profile = async (id_user, nama_lengkap, about, alamat, no_tlp, email, pekerjaan, foto) => {
    const query = 'INSERT INTO profile (id_user, nama_lengkap, about, alamat, no_tlp, email, pekerjaan, foto) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    const values = [id_user, nama_lengkap, about, alamat, no_tlp, email, pekerjaan, foto]
    const [result] = await db.promise().query(query, values)
    return {id: result.insertId, id_user, nama_lengkap, about, alamat, no_tlp, email, pekerjaan, foto  }
}

const profileByUserId = async (id_user) => {
    const query = 'SELECT * FROM profile WHERE id_user = ?'
    const [result] = await db.promise().query(query, [id_user])
    return result[0]
}

const updateProfile = async (id_user, nama_lengkap, about, alamat, no_tlp, email, pekerjaan, foto) => {
    const query = 'UPDATE profile SET nama_lengkap=?, about=?, alamat=?, no_tlp=?, email=?, pekerjaan=?, foto=? WHERE id_user=?'
    const values = [nama_lengkap, about, alamat, no_tlp, email, pekerjaan, foto, id_user]
    const [result] = await db.promise().query(query, values)
    return result
}

module.exports = {profile, profileByUserId, updateProfile}