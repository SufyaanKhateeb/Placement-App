const Student = require("../Models/StudentModel");
const Admin = require("../Models/AdminModel");
const Company = require("../Models/CompanyModel");
const jwt = require("jsonwebtoken");
const { userTypes } = require("../Controllers/constants");

module.exports.checkStudent = (req, res, next) => {
	const token = req.cookies["placement_app_cookies"].jwt;
	if (token) {
		jwt.verify(token, process.env["SECRET_KEY"], async (err, decodedToken) => {
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
		jwt.verify(token, process.env["SECRET_KEY"], async (err, decodedToken) => {
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
		jwt.verify(token, process.env["SECRET_KEY"], async (err, decodedToken) => {
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
	const token = req.cookies["placement_app_cookies"] && req.cookies["placement_app_cookies"].jwt;
	if (token) {
		jwt.verify(token, process.env["SECRET_KEY"], async (err, decodedToken) => {
			if (err) {
				next(err);
			} else {
				const userType = decodedToken.userType;
				let user;
				if (userType === userTypes.student) {
					user = await Student.findById(decodedToken.id);
				} else if (userType === userTypes.admin) {
					user = await Admin.findById(decodedToken.id);
				} else {
					user = await Company.findById(decodedToken.id);
				}
				if (user)
					res.json({
						status: true,
						user: {
							id: user.id,
							name: user.name,
							usn: user.usn,
							email: user.email,
							dept: user.dept,
							isVerified: user.isVerified,
						},
						userType,
					});
				else res.json({ status: false });
				next();
			}
		});
	} else {
		const error = { message: "not_authenticated" };
		res.status(401).json(error);
		next();
	}
};

module.exports.checkAuthorized = (req, res, next) => {
	const token = req.cookies["placement_app_cookies"] && req.cookies["placement_app_cookies"].jwt;
	if (token) {
		jwt.verify(token, process.env["SECRET_KEY"], async (err, decodedToken) => {
			if (err) {
				res.json({ status: false });
				next();
			} else {
				const userType = decodedToken.userType;
				let exists;
				if (userType === userTypes.student) {
					exists = await Student.exists({ _id: decodedToken.id });
				} else if (userType === userTypes.admin) {
					exists = await Admin.exists({ _id: decodedToken.id });
				} else {
					exists = await Company.exists({ _id: decodedToken.id });
				}
				if (exists) {
					res.locals._id = decodedToken.id;
					res.locals.userType = userType;
					return next();
				}
				res.status(400).json({ status: false });
			}
		});
	} else {
		res.status(401);
		res.json({ status: false });
		next();
	}
};
