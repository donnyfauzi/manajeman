const db = require('../config/database')

const createUser = async (name, email, hashPassword) => {
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)'
    const values = [name, email, hashPassword] 
    const [result] = await db.promise().query(query, values)
    return { id: result.insertId, name, email, hashPassword }
}

const findUserByEmail = async (email) => {
    const query = 'SELECT * FROM users WHERE email = ?'
    const [rows]= await db.promise().query(query, [email])
    return rows.length > 0 ? rows[0] : null;
}

module.exports = {createUser, findUserByEmail}