const Student = require("../Models/StudentModel");
const Admin = require("../Models/AdminModel");
const Company = require("../Models/CompanyModel");
const jwt = require("jsonwebtoken");

module.exports.checkStudent = (req, res, next) => {
    const token = req.cookies["placement_app_cookies"].jwt;
    if (token) {
        jwt.verify(token, "privateKey", async (err, decodedToken) => {
            if (err) {
                res.json({ status: false });
                next();
            } else {
                const user = await Student.findById(decodedToken.id);
                if (user) res.json({ status: true, user: user });
                else res.json({ status: false });
                next();
            }
        });
    } else {
        res.json({ status: false });
        next();
    }
};

module.exports.checkAdmin = (req, res, next) => {
    const token = req.cookies["placement_app_cookies"].jwt;
    if (token) {
        jwt.verify(token, "privateKey", async (err, decodedToken) => {
            if (err) {
                res.json({ status: false });
                next();
            } else {
                const user = await Admin.findById(decodedToken.id);
                if (user) res.json({ status: true, user: user });
                else res.json({ status: false });
                next();
            }
        });
    } else {
        res.json({ status: false });
        next();
    }
};

module.exports.checkCompany = (req, res, next) => {
    const token = req.cookies["placement_app_cookies"].jwt;
    if (token) {
        jwt.verify(token, "privateKey", async (err, decodedToken) => {
            if (err) {
                res.json({ status: false });
                next();
            } else {
                const user = await Company.findById(decodedToken.id);
                if (user) res.json({ status: true, user: user });
                else res.json({ status: false });
                next();
            }
        });
    } else {
        res.json({ status: false });
        next();
    }
};

module.exports.checkUser = (req, res, next) => {
    const token = req.cookies["placement_app_cookies"].jwt;
    const userType = req.cookies["placement_app_cookies"].userType;
    if (token && userType) {
        jwt.verify(token, "privateKey", async (err, decodedToken) => {
            if (err) {
                res.json({ status: false });
                next();
            } else {
                let user;
                if (userType === "student") {
                    user = await Student.findById(decodedToken.id);
                } else if (userType === "admin") {
                    user = await Admin.findById(decodedToken.id);
                } else {
                    user = await Company.findById(decodedToken.id);
                }
                if (user) res.json({ status: true, user: user });
                else res.json({ status: false });
                next();
            }
        });
    } else {
        res.json({ status: false });
        next();
    }
};

module.exports.checkAuthorized = (req, res, next) => {
    const token = req.cookies["placement_app_cookies"].jwt;
    const userType = req.cookies["placement_app_cookies"].userType;
    if (token && userType) {
        jwt.verify(token, "privateKey", async (err, decodedToken) => {
            if (err) {
                res.json({ status: false });
                next();
            } else {
                let exists;
                if (userType === "student") {
                    exists = await Student.exists({ _id: decodedToken.id });
                } else if (userType === "admin") {
                    exists = await Admin.exists({ _id: decodedToken.id });
                } else {
                    exists = await Company.exists({ _id: decodedToken.id });
                }
                if (exists) {
                    res.locals._id = decodedToken.id;
                    res.locals.userType = userType;
                    return next();
                }
                res.json({ status: false });
            }
        });
    } else {
        res.json({ status: false });
        next();
    }
};
