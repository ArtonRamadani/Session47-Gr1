const express = require("express")
const router = express.Router()

router.use("/auth", require("./auth"))
router.use("/coments", require("./coments"))

module.exports = router