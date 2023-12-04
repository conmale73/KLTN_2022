const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

// Get all users
exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        next(error);
    }
};

// Get a single user
exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            throw new ErrorResponse("User not found", 404);
        }
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
};
// Get a single user by email
exports.getUserByEmail = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) {
            throw new ErrorResponse("User not found", 404);
        }
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
};

// Create a user
exports.createUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "Email is already in use" });
        }

        // Create a new user
        const newUser = new User({ username, email, password });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Update a user
exports.updateUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!user) {
            throw new ErrorResponse("User not found", 404);
        }
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
};

// Delete a user
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            throw new ErrorResponse("User not found", 404);
        }
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};

// Login user
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare the entered password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

        // Send the token as a response
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Logout user
exports.logout = async (req, res, next) => {
    try {
        // Clear user token
        req.user.tokens = [];

        await req.user.save();

        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
};
const cloudinary = require('cloudinary').v2;
//upload image cloud binary
const uploadToCloudinary = async (fileBuffer) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ resource_type: 'image' },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.secure_url);
                }
            }).end(fileBuffer);
    });
};

const updateAvatar = async (email, linkAvatar) => {
    try {
        const result = await User.updateOne({ email: email }, { $set: { avatar: linkAvatar } });
        console.log(`update success ${result.acknowledged}`);
        return result;
    } catch (error) {
        console.error(error);
    }
};

const updateCoverImage = async (email, linkCoverImage) => {
    try {
        const result = await User.updateOne({ email: email }, { $set: { cover_image: linkCoverImage } });
        console.log(`update success ${result.acknowledged}`);
        return result;
    } catch (error) {
        console.error(error);
    }
};


exports.updateAvatarByEmail = async (req, res) => {
    // Kiểm tra xem có file được gửi lên không
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    // Lấy file từ request
    const file = req.files.uploadedFile;
    console.log(file);

    const emailUpdate = req.body.email;
    console.log('update by email:' + emailUpdate);

    // Đọc nội dung của file và tạo buffer
    const fileBuffer = file.data;// lay file nhi phan cua image de gui di
    try {
        // Sử dụng Cloudinary để upload file từ buffer
        const linkImage = await uploadToCloudinary(fileBuffer);
        const updateResult = await updateAvatar(emailUpdate, linkImage);
        let responseObject = {
            urlImage: linkImage,
            updateResult: updateResult.acknowledged
        };
        // Trả về URL của file đã upload và kết quả cập nhật
        res.send(JSON.stringify(responseObject));
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

//update CoverImage
exports.updateCoverImageByEmail = async (req, res) => {
    // Kiểm tra xem có file được gửi lên không
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    // Lấy file từ request
    const file = req.files.uploadedFile;
    console.log(file);

    const emailUpdate = req.body.email;
    console.log('update by email:' + emailUpdate);

    // Đọc nội dung của file và tạo buffer
    const fileBuffer = file.data;// lay file nhi phan cua image de gui di
    try {
        // Sử dụng Cloudinary để upload file từ buffer
        const linkImage = await uploadToCloudinary(fileBuffer);
        const updateResult = await updateCoverImage(emailUpdate, linkImage);
        let responseObject = {
            urlImage: linkImage,
            updateResult: updateResult.acknowledged
        };
        // Trả về URL của file đã upload và kết quả cập nhật
        res.send(JSON.stringify(responseObject));
    } catch (error) {
        return res.status(500).send(error.message);
    }
};


