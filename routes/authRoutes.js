const express = require("express");
const {login, adminRegister} = require("../controllers/authController");

const router = express.Router();

router.post("/admin/register", adminRegister);
router.post("/admin/login", login);

module.exports = router;