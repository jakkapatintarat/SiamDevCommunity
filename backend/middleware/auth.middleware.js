// ตรวจสอบสิทธิ์การเข้าถึงข้อมูลผู้ใช้งาน
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    try {

        if (!req.headers['authorization']) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const authHeader = req.headers['authorization'];
        // Bearer <token>
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const secretKey = process.env.SECRET_KEY;
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid token' });
            }
            // decoded.result ถูกเซ็นใน token
            req.user = decoded.result;
            next();
        });
    } catch (error) {
        res.json({ message: error.message });
    }

};

module.exports = authenticateToken;
