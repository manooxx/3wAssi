const User = require("../models/user");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadUser = async (req, res)=>{

    try{
        const {name, socialHandle} = req.body;
        const imageUrls = await Promise.all(req.files.map(async(file)=>{
            const result = await cloudinary.uploader.upload(file.path);
            return result.secure_url;
        }));

        const newUser = new User({name, socialHandle, images: imageUrls});
        await newUser.save();

        res.status(201).json({message: "User submission successfull"});


    }catch(err){
        res.status(500).json({message: err.message});
    
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

