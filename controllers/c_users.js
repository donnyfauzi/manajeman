const { createUser, findUserByEmail } = require('../models/m_users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports =
{
    registerUser: async (req, res) => {
        try {
            const { name, email, password, confirmPassword } = req.body

            if (!name || !email || !password || !confirmPassword) {
                return res.status(400).json({ message: 'Column cannot be empty !' })
            }

            if (password !== confirmPassword) {
              return res.status(400).json({ message: 'Password do not match !' })
            }

            const existUser = await findUserByEmail(email)
            if (existUser) {
                return res.status(400).json({ message: 'Your email already exists !' })
            }

            const hashedPassword = await bcrypt.hash(password, 10)

            const newUser = await createUser(name, email, hashedPassword)
            res.status(201).json({ message: 'Register successfull, please login !', user: newUser })
        } catch (error) {
            console.error("Error detail:", error);
            res.status(500).json({ message: 'Register failed, please check your server !', error: error.message })
        }
    },

    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body
            const user = await findUserByEmail(email)

            if (!user) {
                return res.status(400).json({success: false, message: 'Invalid email or password !'})
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({success: false, message: 'Invalid email or password !'})
            }

            //membuat token jwt
            const token = jwt.sign(
                { id: user.id, email: user.email, name: user.name },
                process.env.JWT_SECRET,
                {expiresIn: '2h'}
            )

            res.json({success: true, token})

        } catch (error) {
            console.error(error)
            res.status(500).json({success: false,message: 'Login failed, please check your server !'})
        }
    }


}