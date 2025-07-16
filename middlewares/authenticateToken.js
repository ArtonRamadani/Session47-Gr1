const jwt = require("jsonwebtoken")
const JWTKeyWord = "ArtoniSessioni44MeiFortiDeriTash$$_kthesaKamzes__$"

function authenticateToken(req, res, next) {
    const authHeader = req?.headers?.["authorization"]
    const token = authHeader.split(" ")[1]
    if (!token) {
        return res.status(401).json({ message: "Token not provided" })
    }
    jwt.verify(token, JWTKeyWord, (err, data) => {
        if (err) {
            return res.status(403).json({
                message: "Token is not ours!"
            })
        }
        req.user = data
        next()
    })
}
module.exports = authenticateToken