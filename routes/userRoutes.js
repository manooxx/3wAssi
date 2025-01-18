const express = require("express");
const multer = require("multer");
const {uploadUser, getSubmissions } = require("../controllers/userController");
const verifyAdmin = require("../middleware/authMiddleware")

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

router.post("/upload", upload.array("images", 5), uploadUser);
router.get("/submissions", verifyAdmin, getSubmissions);

module.exports = router;
