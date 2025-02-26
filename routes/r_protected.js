const express = require('express')
const verifyToken = require("../midelwares/jwtToken");

const router = express.Router()

router.get("/dashboard", verifyToken, (req, res) => {
  res.json({ message: `${req.user.name}` });
});

module.exports = router