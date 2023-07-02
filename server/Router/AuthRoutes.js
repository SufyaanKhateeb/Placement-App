const {
    register,
    registerAdmin,
    login,
    jobpost,
    getjobs,
    getStudentApplication,
    postStudentApplication,
    getStudentApplications,
} = require("../Controllers/AuthController");
const {
    checkAdmin,
    checkCompany,
    checkStudent,
    checkUser,
    checkAuthorized,
} = require("../Middleware/authMiddleware");

const router = require("express").Router();

router.get("/checkUser", checkUser);
router.post("/student", checkStudent);
router.post("/admin", checkAdmin);
router.post("/company", checkCompany);
router.post("/register", register);
router.get("/student-application", checkAuthorized, getStudentApplication);
router.get("/student-applications", checkAuthorized, getStudentApplications);
router.post("/student-application", checkAuthorized, postStudentApplication);
router.post("/register/admin", registerAdmin);
router.post("/login", login);
router.post("/jobpost", jobpost);
router.get("/getjobs", getjobs);

module.exports = router;
