const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  const authHeader = req.header('Authorization')

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ message: 'Akses ditolak, token tidak ditemukan' })
  }

  const token = authHeader.split(' ')[1]; // Ambil token setelah 'Bearer '

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded;
    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Sesi anda telah habis, silakan login kembali' })
    }
    return res.status(401).json({ message: 'Token tidak valid' })
  }
}

module.exports = verifyToken
