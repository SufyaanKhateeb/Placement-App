
const {register,login,jobpost,getjobs,getLogin,getVerify} = require("../Controllers/AuthController");
const {checkAdmin,checkCompany,checkStudent} = require("../Middleware/authMiddleware")

const router = require("express").Router();

router.post("/student",checkStudent);
router.post("/admin",checkAdmin);
router.post("/company",checkCompany);
router.post("/register",register);
router.post("/login",login);
router.get("/login",getLogin);
router.post("/jobpost",jobpost);
router.get("/getjobs", getjobs);

// router.get("/getVerify", getVerify);

module.exports = router;