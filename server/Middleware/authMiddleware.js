const Student = require("../Models/StudentModel");
const Admin = require("../Models/AdminModel");
const Company = require("../Models/CompanyModel");
const jwt = require("jsonwebtoken");

module.exports.checkStudent = (req, res, next) => {
    console.log("Checking User");
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(
            token,
            "privateKey",
            async (err, decodedToken) => {
                if (err) {
                    res.json({ status: false });
                    next();
                } else {
                    const user = await Student.findById(decodedToken.id);
                    console.log(user);
                    if (user) res.json({ status: true, user: user.USN });
                    else res.json({ status: false });
                    next();
                }
            }
        );
    } else {
        res.json({ status: false });
        next();
    }
};

module.exports.checkAdmin = (req, res, next) => {
    console.log("Checking Admin");
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(
            token,
            "privateKey",
            async (err, decodedToken) => {
                if (err) {
                    res.json({ status: false });
                    next();
                } else {
                    const user = await Admin.findById(decodedToken.id);
                    if (user) res.json({ status: true, user: user.AID });
                    else res.json({ status: false });
                    next();
                }
            }
        );
    } else {
        res.json({ status: false });
        next();
    }
};

module.exports.checkCompany = (req, res, next) => {
    // console.log("Checking User");
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(
            token,
            "privateKey",
            async (err, decodedToken) => {
                if (err) {
                    res.json({ status: false });
                    next();
                } else {
                    const user = await Company.findById(decodedToken.id);
                    if (user) res.json({ status: true, user: user.CID });
                    else res.json({ status: false });
                    next();
                }
            }
        );
    } else {
        res.json({ status: false });
        next();
    }
};