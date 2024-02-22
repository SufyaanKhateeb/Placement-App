const jwt = require("jsonwebtoken");
const StudentModel = require("../Models/StudentModel");
const CompanyModel = require("../Models/CompanyModel");
const AdminModel = require("../Models/AdminModel");
const JobPostModel = require("../Models/JobPostModel");
const StudentDetailsModel = require("../Models/StudentDetailsModel");

const maxAge = 2 * 60 * 20;
const { ObjectId } = require("mongoose").Types;

const createToken = (id) => {
	return jwt.sign({ id }, process.env["SECRET_KEY"], {
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
		if (userType === "student") {
			const USN = ID;
			user = await StudentModel.login(USN, password);
		} else if (userType === "admin") {
			const AID = ID;
			user = await AdminModel.login(AID, password);
		} else {
			const CID = ID;
			user = await CompanyModel.login(CID, password);
		}

		const token = createToken(user._id);

		res.cookie(
			"placement_app_cookies",
			{ jwt: token, userType },
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
		const { name, aid, email, password, dept, userType } = req.body;
		const admin = await AdminModel.create({
			name,
			aid,
			email,
			password,
			dept,
		});
		const token = createToken(admin._id);
		res.cookie(
			"placement_app_cookies",
			{ jwt: token, userType },
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
		const token = createToken(user._id);
		res.cookie(
			"placement_app_cookies",
			{ jwt: token, userType: "student" },
			{
				sameSite: false,
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

module.exports.jobpost = async (req, res, next) => {
	try {
		const jobPost = await JobPostModel.create(req.body);
		if (jobPost) {
			res.status(201).json({ user: jobPost._id, created: true });
		}
		// await jobPost
		//     .save()
		//     .then((item) => {
		//         res.status(201).json({ user: jobPost._id, created: true });
		//     })
		//     .catch((err) => {
		//         res.status(400).json({ created: false });
		//     });
		next();
	} catch (e) {
		res.json({ e, created: false });
	}
};

module.exports.getjobs = async (req, res, next) => {
	try {
		const jobs = await JobPostModel.find({});
		res.send(jobs);
	} catch (e) {
		res.json({ e, created: false });
	}
};

module.exports.getStudentApplication = async (req, res, next) => {
	try {
		const _id = res.locals._id;
		const result = await StudentDetailsModel.findOne({
			studentId: ObjectId(_id),
		})
			.populate({
				path: "studentId",
			})
			.exec();
		if (!result) throw new Error("No application found");

		const resultObject = result.toObject();

		const application = {
			...resultObject.studentId,
			...resultObject,
		};
		delete application.password;
		delete application.studentId;
		delete application.__v;

		res.json({ application, hasApplied: true });
		next();
	} catch (err) {
		const errors = handleErrors(err);
		res.json({ errors });
	}
};

module.exports.getStudentApplications = async (req, res, next) => {
	try {
		if (res.locals.userType !== "admin") throw new Error("Not authorized");
		const result = await StudentDetailsModel.find()
			.populate({
				path: "studentId",
			})
			.exec();
		if (!result) throw new Error();

		const applications = result.map((doc) => {
			const resultObject = doc.toObject();
			const application = {
				...resultObject.studentId,
				...resultObject,
			};
			delete application.password;
			delete application.studentId;
			delete application.__v;
			return application;
		});

		res.json({ applications });
		next();
	} catch (err) {
		const errors = handleErrors(err);
		res.json({ errors });
	}
};

module.exports.postStudentApplication = async (req, res, next) => {
	try {
		const _id = res.locals._id;
		const exists = await StudentDetailsModel.exists({
			studentId: ObjectId(_id),
		});

		if (exists) {
			await StudentDetailsModel.updateOne(
				{ studentId: ObjectId(_id) },
				{
					$set: { ...req.body },
					$currentDate: { lastModified: true },
				}
			);
		} else {
			await StudentDetailsModel.create({
				...req.body,
				studentId: ObjectId(_id),
			});
		}

		res.json({ created: true });
		next();
	} catch (err) {
		const errors = handleErrors(err);
		res.json({ errors, created: false });
	}
};

// module.exports.getVerify = async (req, res, next) => {
//     try {

//         console.log(req.body);
//         var myData = new ApplicationModel(req.body);
//         await myData.save()
//             .then(item => {
//                 res.status(201).json({ user: myData._id, created: true });
//             })
//             .catch(err => {
//                 res.status(400).json({ created: false });
//             });
//         next();
//     } catch (e) {
//         console.log(e);
//         res.json({ e, created: false })
//     }
//     next();
// }

// module.export.getApplications = async(req,res,next) => {
//     await MongoClient.connect('mongodb://localhost:27017/LoginPlacement', function (err, db) {
//         if (err) throw err;
//         var applications = db.collection('Applications');
//         applications.find({}).toArray(function (err, result) {
//             if (err) {
//                 res.send(err);
//             } else {
//                 res.send(JSON.stringify(result));
//             }
//         })
//     });
//     next();
// }
