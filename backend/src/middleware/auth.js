import jwt from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
    try {
        // Get token from header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({
                success: false,
                message: 'Not authenticated. Please provide a valid token.',
            });
            return;
        }

        const token = authHeader.substring(7);

        // Verify token
        const jwtSecret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

        try {
            const decoded = jwt.verify(token, jwtSecret);
            req.userId = decoded.userId;
            next();
        } catch (error) {
            res.status(401).json({
                success: false,
                message: 'Invalid or expired token. Please login again.',
            });
            return;
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Authentication error',
        });
    }
};
