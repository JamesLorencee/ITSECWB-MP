exports.authenticateRoles = (requiredRole) => {
    return (req, res, next) => {
        const role = req.params.role;
        if (req.user) {
            if (req.user.isAdmin ? "true" : "false" == role)
                return next();

            return res.status(401).json({ error: "unauthorized access" })
        }
        return res.status(401).json({ error: "unauthorized access" })
    }
}
