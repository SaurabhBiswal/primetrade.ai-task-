import { User } from '../models/User.js';

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            res.status(404).json({
                success: false,
                message: 'User not found',
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
            },
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error fetching profile',
        });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body;

        // Validation
        if (!name && !email) {
            res.status(400).json({
                success: false,
                message: 'Please provide at least one field to update',
            });
            return;
        }

        const updateData = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;

        // Check if email is already taken by another user
        if (email) {
            const existingUser = await User.findOne({ email, _id: { $ne: req.userId } });
            if (existingUser) {
                res.status(400).json({
                    success: false,
                    message: 'Email already in use',
                });
                return;
            }
        }

        const user = await User.findByIdAndUpdate(
            req.userId,
            updateData,
            { new: true, runValidators: true }
        );

        if (!user) {
            res.status(404).json({
                success: false,
                message: 'User not found',
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error updating profile',
        });
    }
};
