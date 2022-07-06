
const {register,login} = require("../Controllers/AuthController");
const {checkAdmin,checkCompany,checkStudent} = require("../Middleware/authMiddleware")

const router = require("express").Router();

router.post("/student",checkStudent);
router.post("/admin",checkAdmin);
router.post("/company",checkCompany);
router.post("/register",register);
router.post("/login",login);

module.exports = router;