const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    // Demo Mode Bypass: If Demo-Mode header is present, fetch the demo user from DB
    if (req.headers['demo-mode'] && req.headers['demo-user-id']) {
        try {
            req.user = await User.findById(req.headers['demo-user-id']).select('-password');
            if (req.user) return next();
        } catch (error) {
            console.error('Demo bypass error:', error);
        }
    }

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token && !req.user) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

const admin = (req, res, next) => {
    // Demo Mode Bypass for Admin routes
    if (req.headers['demo-mode'] && req.headers['demo-user-id']) {
        if (req.user && req.user.role === 'Admin') return next();
    }

    if (req.user && req.user.role === 'Admin') {
        next();
    } else {
        res.status(401).json({ message: 'Not authorized as an admin' });
    }
};

const studentOnly = (req, res, next) => {
    // Demo Mode Bypass for Student only routes (Forum)
    if (req.headers['demo-mode']) return next();

    if (req.user && req.user.role === 'Student') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied: Discussion Forum is for students only' });
    }
};

module.exports = { protect, admin, studentOnly };
