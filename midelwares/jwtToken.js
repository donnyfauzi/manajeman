const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  console.log("Header Authorization diterima:", authHeader); // Cek apakah header Authorization terkirim

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("Token tidak ditemukan di server!"); // Token tidak ada
    return res
      .status(401)
      .json({ message: "Akses ditolak, token tidak ditemukan" });
  }

  const token = authHeader.split(" ")[1]; // Ambil token setelah "Bearer "
  console.log("Token yang diterima:", token); // Log token

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    console.log("Token valid:", req.user); // Token berhasil diverifikasi
    next();
  } catch (error) {
    console.log("Error decoding token:", error); // Jika ada kesalahan saat decode token
    return res.status(401).json({ message: "Token tidak valid" });
  }
};



module.exports = verifyToken;
