const { profile, profileByUserId, updateProfile } = require('../models/m_profile')
const path = require('path')
const fs = require('fs')
const multer = require('multer')

// config multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")// Folder tempat menyimpan foto
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))// Nama file unik
    }
})

const upload = multer({ storage: storage }).single("foto")

const createProfile = async (req, res) => {
    try {
        const id_user = req.user.id
        console.log("ID User:", id_user) 
        const uploadFile = () => {
            return new Promise((resolve, reject) => {
                upload(req, res, (err) => {
                    if (err) return reject(err)
                    resolve(req.file ? req.file.filename : "default.jpg")
                })
            })
        }

        const foto = await uploadFile() // Tunggu hingga upload selesai
                
        const { nama_lengkap, about, alamat, no_tlp, email, pekerjaan } = req.body
        
        if (!nama_lengkap || !about || !alamat || !no_tlp || !email || !pekerjaan) {
            return res.status(400).json({ message: 'Semua kolom harus diisi!' });
        }

        const userExists = await profileByUserId(id_user)
        if (userExists) {
            return res.status(400).json({ message: 'profil sudah ada!' });
        }

        const result = await profile(id_user, nama_lengkap, about, alamat, no_tlp, email, pekerjaan, foto)
        return res.json({ message: 'Profile berhasil ditambahkan', id: result.id })
    
    } catch (error) {
        console.error('Error:', error)
        return res.status(500).json({ message: 'Terjadi kesalahan server' })
    }
}

const getProfileById = async (req, res) => {
    try {
        const id_user = req.user.id
        const result = await profileByUserId(id_user)

        return res.json(result)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const updateProfileByUserId = async (req, res) => {
    try {
        const id_user = req.user.id
        console.log("ID User:", req.user.id)

        
        const profile = await profileByUserId(id_user)

        if (!profile || !profile.foto) {
            console.log("Profile or foto not found:", profile);
            return res.status(404).json({ message: "Profile tidak ditemukan atau foto tidak ada" })
        }
        
        // Fungsi upload file
        const uploadFile = () => {
            return new Promise((resolve, reject) => {
                upload(req, res, (err) => {
                    if (err) return reject(err)
                        resolve(req.file ? req.file.filename : profile.foto) // Jika tidak ada file baru, gunakan foto lama
                })
            })
        }
        
        const foto = await uploadFile()
        
        const { nama_lengkap, about, alamat, no_tlp, email, pekerjaan, } = req.body

        const updatedProfile = await updateProfile(id_user, nama_lengkap, about, alamat, no_tlp, email, pekerjaan, foto)

        if (updatedProfile.changedRows === 0) {
            return res.status(404).json({ message: 'Tidak ada perubahan pada profile' })
          }

        return res.status(200).json({ message: 'Berhasil update data profile', originalProfile: profile, updatedProfile: updatedProfile })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Terjadi kesalahan saat update data', error })
    }
    
}

module.exports = {createProfile, getProfileById, updateProfileByUserId}