const subtotal = require('../models/m_subtotal')

const getSubtotal = async (req, res) => {
    try {
        const id_user = req.user.id;
        const total = await subtotal(id_user)
        
        return res.json({ total })
        
    } catch (error) {
        return res.status(500).json({ message: "Terjadi kesalahan saat mengambil total " })
    }
}

module.exports = getSubtotal