const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');


const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword});

        await user.save();
        return res.status(201).json({ message: 'User registered successfully!' });

    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong while registering the new user!' })
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) return res.status(401).json({ error: 'Invalid credentials!' });
        const isPasswordTrue = await bcrypt.compare(password, user.password);

        if (!isPasswordTrue) return res.status(401).json({ error: 'Invalid credentials!' });


        const token = jwt.sign({ id: user._id, type: user.type }, process.env.JWT_SECRET, { expiresIn: '30d' });

        return res.status(200).json({ message: 'Login successful!', token, role: user.type });

    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong while logging in!' })
    }
}

const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: 'Could not get user!' });
    }
}


const getAllUsers = async (req, res) => {
    try {
        const userId = req.user.id;
        const start = req.query.start || 0;
        const count = req.query.count || 10;
        const users = await User.find({ _id: { $ne: userId } }).skip(start).limit(count);
        const totalUsers = await User.countDocuments({ _id: { $ne: userId } });
        return res.status(200).json({ users, count: totalUsers });
    } catch (error) {
        return res.status(500).json({ error: 'Could not get users!' });
    }
}

const removeUser = async (req, res) => {
    try {
        const { userId } = req.body;

        await User.findByIdAndDelete(userId);

        return res.status(200).json({ message: 'User removed successfully!' });

    } catch (error) {
        return res.status(500).json({ error: 'Could not remove the user successfully!' });
    }
}


const uploadProfilePhoto = async (req, res) => {
    try {
        const userId = req.user.id;
        const profileImg = `/uploads/${req.file.filename}`;

        await User.findByIdAndUpdate(userId, { profileImg });

        return res.status(201).json({ message: 'Profile photo uploaded successfully!', profileImg })
    } catch (error) {
        return res.status(500).json({ error: 'Error occured while uploading a photo!' });
    }
}


const editUser = async (req, res) => {
    try {
        const { userId, name, surname, email, password, rtc, roles } = req.body;

        if (!userId) return res.status(404).json({ error: 'User not found!' });

        let editedData = {};

        if (name) editedData.name = name;
        if (surname) editedData.surname = surname;
        if (email) editedData.email = email;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            editedData.password = hashedPassword;
        }
        if (rtc) editedData.rtc = rtc;
        if (roles) editedData.roles = roles;

        const editedUser = await User.findByIdAndUpdate(
            userId,
            editedData,
            { new: true }
        );

        return res.status(201).json({ message: 'User updated successfully!', user: editedUser });

    } catch (error) {
        return res.status(500).json({ error: 'User could not be updated successfully!' });
    }
}


const searchUsers = async (req, res) => {
    try {
        const start = req.query.start || 0;
        const count = req.query.count || 5;
        const { searchText } = req.query;

        const filter = {
            type: 'user',
            $or: [
                { name: { $regex: searchText, $options: 'i' } },
                { surname: { $regex: searchText, $options: 'i' } },
                { email: { $regex: searchText, $options: 'i' } }
            ]
        };

        const users = await User.find(filter).skip(start).limit(count);
        const totalSearchResult = await User.countDocuments(filter);
        return res.status(200).json({ users, count: totalSearchResult });
    } catch (error) {
        return res.status(500).json({ error: 'Error occured while searching the users!' });
    }
}

const getMe = async (req, res) => {
    try {
        const userId = req.user.id;

        if (!userId) return res.status(404).json({ error: 'User not found!' });

        const user = await User.findById(userId);

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error!' })
    }
}


const updateAbout = async (req, res) => {
    try {
        const userId = req.user.id;
        const { about } = req.body;

        const updatedUser = await User.findByIdAndUpdate(userId, { about }, { new: true });

        return res.status(201).json({ user: updatedUser, message: 'User updated successfully!' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error!' });
    }
}

const updateProfileView = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) return res.status(404).json({ error: 'User not found!' });

        if (userId === req.user.id) return res.status(400).json({ error: 'Can not update self profile view!' });

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $inc: { profileViewers: 1 } },
            { new: true, select: 'profileViewers' }
        );

        return res.status(201).json({ user: updatedUser, message: 'Profile view updated successfully' });
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error!' });
    }
}


module.exports = {
    register,
    login,
    removeUser,
    uploadProfilePhoto,
    editUser,
    getUser,
    getAllUsers,
    searchUsers,
    getMe,
    updateAbout,
    updateProfileView
}