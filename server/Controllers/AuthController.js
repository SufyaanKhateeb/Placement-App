const jwt = require("jsonwebtoken");
const StudentModel = require("../Models/StudentModel");
const CompanyModel = require("../Models/CompanyModel");
const AdminModel = require("../Models/AdminModel");
const { userTypes } = require("./constants");

const maxAge = 2 * 60 * 20;

const createToken = (val = {}) => {
	return jwt.sign(val, process.env["SECRET_KEY"], {
		expiresIn: maxAge,
	});
};

const handleErrors = (err) => {
	let errors = { error: "" };

	if (err.message === "Incorrect USN") {
		errors.error = "USN not registered";
	} else if (err.message === "Incorrect Admin ID") {
		errors.error = "Admin ID not registered";
	} else if (err.message === "Incorrect Company ID") {
		errors.error = "Company ID not registered";
	} else if (err.message === "Incorrect password") {
		errors.error = "Incorrect Credentials";
	} else if (err.message === "User already exists") {
		errors.error = "USN already registered";
	} else if (err.message) {
		errors.error = err.message;
	} else {
		errors.error = err;
		errors.defaultMessage = "Something went wrong";
	}
	return errors;
};

module.exports.login = async (req, res, next) => {
	var user;
	try {
		const { userType, ID, password } = req.body;
		if (userType === userTypes.student) {
			const USN = ID;
			user = await StudentModel.login(USN, password);
		} else if (userType === userTypes.admin) {
			const AID = ID;
			user = await AdminModel.login(AID, password);
		} else {
			const CID = ID;
			user = await CompanyModel.login(CID, password);
		}

		const token = createToken({ id: user._id, userType });

		res.cookie(
			"placement_app_cookies",
			{ jwt: token },
			{
				httpOnly: true,
				maxAge: maxAge * 1000,
			}
		);

		res.json({ user, created: true });
		res.status(200);
	} catch (err) {
		const errors = handleErrors(err);
		res.json({ errors, created: false });
		res.status(401);
	}
};

module.exports.logout = async (req, res, next) => {
	try {
		res.clearCookie("placement_app_cookies", {
			httpOnly: true,
			maxAge: 0,
		});

		res.status(201);
		res.send();
	} catch (err) {
		res.status(400);
		res.json(err);
	}
};

module.exports.registerAdmin = async (req, res, next) => {
	try {
		const { name, aid, email, password, dept } = req.body;
		const admin = await AdminModel.create({
			name,
			aid,
			email,
			password,
			dept,
		});
		const token = createToken({ id: admin._id, userType: userTypes.admin });
		res.cookie(
			"placement_app_cookies",
			{ jwt: token },
			{
				httpOnly: false,
				maxAge: maxAge * 1000,
			}
		);
		res.status(201).json({ admin: admin._id, created: true });
		next();
	} catch (err) {
		const errors = handleErrors(err);
		res.json({ errors, created: false });
	}
};

module.exports.register = async (req, res, next) => {
	try {
		var isVerified = false;
		const { name, usn, email, password, dept } = req.body;
		const user = await StudentModel.create({
			name,
			usn,
			email,
			password,
			dept,
			isVerified,
		});
		const token = createToken({ id: user._id, userType: userTypes.student });
		res.cookie(
			"placement_app_cookies",
			{ jwt: token },
			{
				httpOnly: false,
				maxAge: maxAge * 1000,
			}
		);
		res.status(201).json({ user, created: true });
		next();
	} catch (err) {
		const errors = handleErrors(err);
		res.json({ errors, created: false });
	}
};
