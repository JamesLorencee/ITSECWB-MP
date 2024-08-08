exports.authenticateRoles = (requiredRole) => {
    return (req, res, next) => {
        if (req.user) {
            if (req.user.isAdmin ? "true" : "false" == requiredRole)
                return next();

            return res.status(401).json({ ok: false, error: "unauthorized access" })
        }
        return res.status(401).json({ ok: false, error: "unauthorized access" })
    }
}
