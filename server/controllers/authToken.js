import jwt from 'jsonwebtoken';

export const authToken = (req, res, next) => {
    const token = req.cookies.token;
    console.log('Cookies:', req.cookies); // Debugging: Check if cookies are being sent
    console.log('Token:', token); // Debugging: Check if token is extracted

    // Check if token is provided
    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, 'secret_key');

        // Attach decoded token to request object for use in other routes
        req.user = { id: decoded.id, email: decoded.email };
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        // Handle possible errors
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token has expired" });
        }
        return res.status(401).json({ message: "Invalid token" });
    }
};
