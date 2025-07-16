const express = require("express")
const User = require("../models/users")
const router = express.Router()


const validator = require("validator")


router.post("/login", async (req, res) => {
    try {
        let { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: "Ju lutem drgoni emailin dhe passwordin!" })
        }
        email = validator.normalizeEmail(email);
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Email nuk eshte valid!" });
        }
        password = validator.trim(password);
        const foundUser = await User.findOne({ email: String(email), password: String(password) }) // SQL DB QUERY
        // const foundUser = await User.findOne({ email: String(email), password: String(password) }) //MONGO QUERY
        if (!foundUser) {
            return res.status(400).json({ message: "Nuk egziston nje user me kete email!" })
        }

        if (String(foundUser.password) !== String(password)) {
            return res.status(403).json({ message: "Passwordi eshte gabim!" })
        }

        return res.status(200).json({ message: "Login Sucessfull!", data: foundUser })
    } catch (error) {
        console.log("error", error)
        res.status(500).json({ message: "Internal server error!" })
    }
})

let comments = []

router.post("/coments", (req, res) => {
    let { comment } = req.body
    comments.push(comment)
    res.send("komentove me suksee")
})
router.get("/coments", (req, res) => {
    let { comment } = req.body
    comments.push(comment)
    res.send("komentove me suksee")
})



module.exports = router