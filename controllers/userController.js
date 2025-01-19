const User = require("../models/user");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});



const uploadUser = async (req, res) => {
    
    try {
        const { name, socialHandle } = req.body;

        // Ensure files are received
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "No files uploaded" });
        }


        // Upload images to Cloudinary and get URLs
        const imageUrls = await Promise.all(req.files.map(async (file) => {
            try {
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: "user_uploads" // Organize files in Cloudinary
                });
                return result.secure_url;
            } catch (uploadError) {
                console.error("Cloudinary upload error:", uploadError);
                throw new Error("Failed to upload image to Cloudinary.");
            }
        }));

        // Ensure name and socialHandle exist
        if (!name || !socialHandle) {
            return res.status(400).json({ message: "Name and social handle are required." });
        }

        // Save user to MongoDB
        const newUser = new User({
            name,
            socialHandle,
            images: imageUrls
        });

        await newUser.save();

        res.status(201).json({
            message: "User submission successful",
            images: imageUrls
        });

    } catch (err) {
        console.error("Server error:", err);
        res.status(500).json({ message: err.message });
    }
};


const getSubmissions = async (req, res)=>{
    try{
        const users = await User.find();
        res.status(200).json(users);

    }catch(err){
        res.status(500).json({message: err.message})
    }
};

module.exports = {uploadUser, getSubmissions};

