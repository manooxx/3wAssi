const multer = require("multer");

const storage = multer.memoryStorage(); // Store files in memory, not disk

const upload = multer({ storage: storage });

module.exports = upload;
