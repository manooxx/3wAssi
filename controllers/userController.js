const User = require("../models/user");
const cloudinary = require("cloudinary").v2;
const multer = require('multer');


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({storage: storage});


const uploadUser = async (req, res)=>{

    try{
        const {name, socialHandle} = req.body;
        const imageUrls = await Promise.all(req.files.map(async(file)=>{
            const result = await cloudinary.uploader.upload_stream({
                resource_type: "auto"
            }, (error, result)=>{
                if(error) throw new Error(error.message);
                return result.secure_url;
            });
            result.end(file.buffer);
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

