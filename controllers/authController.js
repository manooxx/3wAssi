const Admin = require("../models/admin");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const adminRegister = async (req, res)=>{
    const {email, password} = req.body;
    try{
        const existingAdmin = await Admin.findOne({email});
        if(existingAdmin) 
            return res.status(400).json({message:"Admin is already registered"});
        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = new Admin ({email, password: hashedPassword});
        await admin.save()
        res.json({message: "Admin Registered"});

    }catch(err){
        res.status(500).json({message: "Admin does not registered"});
    }

};

const login = async (req, res)=>{
    const {email, password} = req.body;
    const admin = await Admin.findOne({email});
    if(!admin)
        return res.status(400).json({message: 'Admin does not exist'});
    const validPass = await bcrypt.compare(password, admin.password);
    if(!validPass)
        return res.status(400).json({message: 'Password does not match'});
    const token = jwt.sign({_id: admin._id}, process.env.JWT_SECRET);
    res.header('Authorization', token).json({message:"Logged in Successfully", token});

};

module.exports = {adminRegister, login}
