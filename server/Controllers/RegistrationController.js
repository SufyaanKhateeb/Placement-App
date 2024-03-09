// const AdminModel = require("../Models/AdminModel");
const StudentDetailsModel = require("../Models/StudentDetailsModel");
const StudentModel = require("../Models/StudentModel");
const { userTypes, registrationStatus } = require("./constants");

const { ObjectId } = require("mongoose").Types;

const handleErrors = (err) => {
	let errors = { error: "" };

	if (err.message) {
		errors.error = err.message;
	} else {
		errors.error = err;
		errors.defaultMessage = "Something went wrong";
	}
	return errors;
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

		const comments = [...resultObject.adminComments, ...resultObject.studentComments];
		comments.sort((a, b) => a.createdAt - b.createdAt);

		const application = {
			...resultObject.studentId,
			...resultObject,
			studentId: resultObject.studentId._id,
			comments,
		};
		delete application.adminComments;
		delete application.studentComments;
		delete application.password;
		delete application.__v;

		res.json({ application });
		next();
	} catch (err) {
		const errors = handleErrors(err);
		res.json({ errors });
	}
};

module.exports.getStudentApplications = async (req, res, next) => {
	try {
		if (res.locals.userType !== userTypes.admin) throw new Error("Not authorized");
		const result = await StudentDetailsModel.find()
			.populate({
				path: "studentId",
			})
			.exec();
		if (!result) throw new Error();

		const applications = result.map((doc) => {
			const resultObject = doc.toObject();

			const comments = [...resultObject.adminComments, ...resultObject.studentComments];
			comments.sort((a, b) => a.createdAt - b.createdAt);

			const application = {
				...resultObject.studentId,
				...resultObject,
				studentId: resultObject.studentId._id,
				comments,
			};

			delete application.adminComments;
			delete application.studentComments;
			delete application.password;
			delete application.__v;

			return application;
		});

		res.json({ applications });
		next();
	} catch (err) {
		const errors = handleErrors(err);
		res.json({ errors });
	}
}

const refNames = [
	"fatherName",
	"motherName",
	"email",
	"alternateEmail",
	"phone",
	"alternatePhone",
	"gender",
	"dob",
	"diploma",
	"nationality",
	"address",
	"state",
	"city",
	"country",
	"pincode",
	"cgpa",
	"backlogs",
];;

module.exports.postStudentApplication = async (req, res, next) => {
	try {
		if (res.locals.userType !== userTypes.admin && res.locals.userType !== userTypes.student) throw new Error("Not authorized");
		const _id = res.locals._id;
		const exists = await StudentDetailsModel.exists({
			studentId: ObjectId(_id),
		});

		const application = {};
		for(const ref of refNames) {
			if(!req.body[ref]) throw new Error(`${ref} is required`);
			application[ref] = req.body[ref];
		}

		if (exists) {
			await StudentDetailsModel.updateOne(
				{ studentId: ObjectId(_id) },
				{
					$set: application,
					$currentDate: { lastModified: true },
				}
			);
		} else {
			await StudentDetailsModel.create({
				...application,
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

const matchAuthorIdsOptions = [
	{
		$lookup: {
			from: "admins",
			localField: "adminComments.author",
			foreignField: "_id",
			as: "adminInfo",
		},
	}, // Populate adminInfo field for adminComments
	{
		$lookup: {
			from: "students",
			localField: "studentComments.author",
			foreignField: "_id",
			as: "studentInfo",
		},
	}, // Populate studentInfo field for studentComments
	{
		$addFields: {
			comments: {
				$let: {
					vars: {
						adminComments: {
							$map: {
								input: "$adminComments",
								as: "comment",
								in: {
									$mergeObjects: [
										"$$comment",
										{
											$let: {
												vars: {
													admin: {
														$arrayElemAt: [
															"$adminInfo",
															{
																$indexOfArray: ["$adminComments.author", "$$comment.author"],
															},
														],
													},
												},
												in: {
													authorName: "$$admin.name",
												},
											},
										},
									],
								},
							},
						},
						studentComments: {
							$map: {
								input: "$studentComments",
								as: "comment",
								in: {
									$mergeObjects: [
										"$$comment",
										{
											$let: {
												vars: {
													student: {
														$arrayElemAt: [
															"$studentInfo",
															{
																$indexOfArray: ["$studentComments.author", "$$comment.author"],
															},
														],
													},
												},
												in: {
													authorName: "$$student.name",
												},
											},
										},
									],
								},
							},
						},
					},
					in: {
						$concatArrays: ["$$adminComments", "$$studentComments"],
					},
				},
			},
		},
	},
];

module.exports.getStudentApplicationFormComments = async (req, res, next) => {
	try {
		if (res.locals.userType !== userTypes.admin && res.locals.userType !== userTypes.student) throw new Error("Not authorized");

		const studentId = req && req.query && req.query.studentId;
		if (!studentId) throw new Error("Provide student id");

		const studentDetails = await StudentDetailsModel.aggregate([
			{ $match: { studentId: ObjectId(studentId) } }, // Filter by studentId
			...matchAuthorIdsOptions,
		]);

		if (!studentDetails.length) {
			throw new Error("Student details not found");
		}

		studentDetails[0].comments.sort((a, b) => a.createdAt - b.createdAt);
		res.json({ comments: studentDetails[0].comments });
		next();
	} catch (err) {
		console.log(err);
		res.status(404).json({ err });
	}
};

module.exports.addStudentApplicationFormComment = async (req, res, next) => {
	try {
		if (res.locals.userType !== userTypes.admin && res.locals.userType !== userTypes.student) throw new Error("Not authorized");

		const detailsId = req && req.body && req.body.id;
		if (!detailsId) throw new Error("Provide application id");

		const { comment } = req.body; // Assuming comment and commentorId are provided in the request body

		if (!comment) throw new Error("Comment cannot be empty");

		if (res.locals.userType === userTypes.admin) {
			await StudentDetailsModel.findOneAndUpdate(
				{ _id: detailsId },
				{
					$push: {
						adminComments: {
							comment,
							author: res.locals._id,
						},
					},
				}
			);
		} else {
			await StudentDetailsModel.findOneAndUpdate(
				{ _id: detailsId },
				{
					$push: {
						studentComments: {
							comment,
							author: res.locals._id,
						},
					},
				}
			);
		}
		const updatedData = await StudentDetailsModel.aggregate([
			{ $match: { _id: ObjectId(detailsId) } }, // Filter by studentId
			...matchAuthorIdsOptions,
		]);

		if (!updatedData || !updatedData.length) {
			return res.status(404).json({ message: "Student details not found" });
		}

		updatedData[0].comments.sort((a, b) => a.createdAt - b.createdAt);
		res.json({ updatedStudentDetails: updatedData[0] }); // Return the updated student details
		next();
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
};

module.exports.updateApplicationStatus = async (req, res, next) => {
	try {
		if (res.locals.userType !== userTypes.admin) throw new Error("Not authorized");

		const applications = req && req.body && req.body.applications;
		if (!applications) throw new Error("Provide a list of applications with id and status to set");
		applications.forEach((application) => {
			const { id: applicationId, status: newStatus } = application;
			if (!applicationId) throw new Error("Provide application id with all applications");
			if (!newStatus) throw new Error("Provide updated status with all applications");

			if (newStatus !== registrationStatus.approved && newStatus !== registrationStatus.rejected && newStatus !== registrationStatus.pending) {
				throw new Error("Invalid status. Status can only be one of ['Pending', 'Approved', 'Rejected']");
			}
		});

		const updatedApplications = [];

		for (const application of applications) {
			const { id: applicationId, status: newStatus } = application;

			const updatedStudentDetails = await StudentDetailsModel.findOneAndUpdate(
				{ _id: applicationId },
				{
					$set: { status: newStatus },
				}
			);

			if (!updatedStudentDetails) throw new Error("Invalid id");

			const updatedStudent = await StudentModel.findByIdAndUpdate(ObjectId(updatedStudentDetails.studentId), {
				$set: { isVerified: newStatus === registrationStatus.approved ? true : false },
			});

			if (!updatedStudent) throw new Error();

			if (updatedStudent && updatedStudentDetails) {
				updatedApplications.push({
					_id: applicationId,
					status: newStatus,
				});
			}
		}

		return res.json({ applications: updatedApplications });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error", err: error });
	}
};
