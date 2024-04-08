import { auth } from 'express-oauth2-jwt-bearer';
import jwt from 'jsonwebtoken';

const jwtCheck = auth({
    audience: "http://localhost:8000",
    issuerBaseURL: "https://dev-7bh3g7wrkxtwau6x.us.auth0.com",
    tokenSigningAlg: "RS256"
});

// Extend jwtCheck middleware to include token expiry validation
const extendedJwtCheck = async (req, res, next) => {
    jwtCheck(req, res, async (error) => {
        if (error) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const token = req.headers.authorization;
        try {
            const decoded = jwt.decode(token);
            if (decoded && decoded.exp) {
                const currentTime = Math.floor(Date.now() / 1000);
                if (decoded.exp < currentTime) {
                    return res.status(401).json({ message: 'Token has expired' });
                } else {
                    // Token is still valid, proceed to the next middleware
                    next();
                }
            } else {
                return res.status(400).json({ message: 'Invalid token format' });
            }
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    });
};

export default extendedJwtCheck;
