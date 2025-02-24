const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')
  console.log("Token dari request:", token);

  if (!token) {
    return res.status(401).json({ message: 'Akses ditolak, token tidak ditemukan' })
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''),process.env.JWT_SECRET)
    req.user = decoded
    next()

  } catch (error) {
    res.status(401).json({ message: 'Token tidak valid' })
  }
}

module.exports = verifyToken 
