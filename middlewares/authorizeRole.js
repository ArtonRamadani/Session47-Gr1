function authorizeRole(...allowedRoles) {
    return (req, res, next) => {
        console.log("allowedRoles",allowedRoles, req.user.role)
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied for your role!" })
        }
        next()
    }
}
module.exports = authorizeRole