const express = require("express")
const router = express.Router()

let comments = []

router.post("/", (req, res) => {
    let { comment } = req.body
    comments.push(String(comment))
    res.send("komentove me suksee")
})



router.get("/all", (req, res) => {
    let comentView =
        `
    <div>
        <p>keto jane te gjitha komentet tona qe kemi deri tani</p>
        <br/>
        ${comments.map((com) => {
            return com
        })}
    </div>
`
    res.send(comentView)
})



module.exports = router