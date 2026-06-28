const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'creatoai_secret_key_2026', { expiresIn: '30d' });
};

// @route POST /api/v1/auth/signup
const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ success: false, error: 'User already exists' });
        }

        const user = await User.create({ name, email, password });
        return res.status(201).json({
            success: true,
            token: generateToken(user._id),
            user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (error) {
        next(error);
    }
};

// @route POST /api/v1/auth/login
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            return res.status(200).json({
                success: true,
                token: generateToken(user._id),
                user: { id: user._id, name: user.name, email: user.email }
            });
        } else {
            return res.status(401).json({ success: false, error: 'Invalid email or password' });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = { registerUser, loginUser };
