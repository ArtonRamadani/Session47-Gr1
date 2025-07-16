const express = require("express")
const router = express.Router()
const { User } = require("../models/users")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const authenticateToken = require("../middlewares/authenticateToken")
const authorizeRole = require("../middlewares/authorizeRole")
const saultRounds = 10
const JWTKeyWord = "ArtoniSessioni44MeiFortiDeriTash$$_kthesaKamzes__$"

router.get('/me', authenticateToken, authorizeRole("admin"), async (req, res) => {
    try {
        // const token = req?.headers?.authorization?.split(" ")[1]
        // if (!token) {
        //     return res.status(400).json({ message: "token not provided" })
        // }
        const foundUser = await User.findOne({ _id: req.user._id })
        res.status(200).json({ message: "Your info fetched successfully!, ", data: foundUser })

        console.log("token", token)
    } catch (error) {
        console.log("Personale info error: ", error)
        res.status(500).json({ message: "Internal server error!" })
    }
})



router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const foundUser = await User.findOne({ email })
        if (!foundUser) {
            return res.status(400).json({ message: "Nuk egzsiton nje perdorues me kete email!" })
        }
        const isMatch = await bcrypt.compare(password, foundUser.password)
        if (!isMatch) {
            return res.status(403).json({ message: "Passwordi eshte gabim!" })
        }
        const returnInfo = foundUser.toObject()
        delete returnInfo.password
        delete returnInfo.__v
        const token = jwt.sign(returnInfo, JWTKeyWord)
        res.status(200).json({
            message: "U verifikuat me sukses",
            token
        })
    } catch (error) {
        console.log("Login error: ", error)
        res.status(500).json({ message: "Internal server error!" })
    }
})
router.post('/register', async (req, res) => {
    try {
        console.log("req.body", req.body)
        const { first_name, last_name, email, password, age, role } = req.body
        if (!first_name || !last_name || !email || !password || !age || !role) {
            return res.status(400).json({ message: "Emri, mbiemri emaila passwordi mosha dhe roli jane fusha te detyrueshme!" })
        }

        try {
            bcrypt.hash(password, saultRounds, async function (err, hash) {
                if (err) {
                    return res.status(403).json({ message: `Internal Server Error!` })

                }
                const newUser = new User({ first_name, last_name, email, password: hash, age, role })
                await newUser.save(newUser)
            })
        }
        catch (error) {
            if (error.errorResponse.code === 11000) {
                return res.status(403).json({ message: `A user exists with ${JSON.stringify(error.errorResponse.keyValue)}` })
            } else {
                return res.status(500).json({ message: `Unknon error ocoured!` })
            }
        }
        return res.status(200).json({ message: "Useri u krijua me suskes" })

    } catch (error) {
        console.log("Register error: ", error)
        res.status(500).json({ message: "Internal server error!" })
    }
})


module.exports = router