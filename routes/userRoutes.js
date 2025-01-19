const express = require("express");
const multer = require("multer");
const {v4: uuidv4} = require("uuid")
const {uploadUser, getSubmissions } = require("../controllers/userController");
const verifyAdmin = require("../middleware/authMiddleware")


const router = express.Router();
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads');  // Temporary local storage before uploading to Cloudinary
    },
    filename: function(req, file, cb){
        const random = uuidv4();
        cb(null, random + "_" + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post("/upload", upload.array('images', 10), uploadUser);

router.get("/submissions", verifyAdmin, getSubmissions);


module.exports = router;
