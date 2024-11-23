const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) return res.status(401).json({ error: "Not authenticated!" });


    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if (err) return res.status(403).json({ error: "Session expired!" });

        req.user = data;
        next();
    })
}


const verifyAdmin = (req, res, next) => {
    if (req.user.type !== 'admin') {
        return res.status(403).json({ error: "Not allowed!" });
    }

    next();
}


module.exports = { authenticateToken, verifyAdmin }