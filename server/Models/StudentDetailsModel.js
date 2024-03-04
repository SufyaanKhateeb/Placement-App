const mongoose = require("mongoose");
const { registrationStatus } = require("../Controllers/constants");

// Schema for comments added by admin
const adminCommentSchema = new mongoose.Schema(
	{
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Admin", // Assuming you have an Admin model
			required: true,
		},
		comment: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

// Schema for comments added by student
const studentCommentSchema = new mongoose.Schema(
	{
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Student", // Assuming you have a Student model
			required: true,
		},
		comment: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const StudentDetailsSchema = new mongoose.Schema(
	{
		fatherName: {
			type: String,
			required: [true, "All fields are Required"],
		},
		motherName: {
			type: String,
			required: [true, "All fields are Required"],
		},
		email: {
			type: String,
			required: [true, "All fields are Required"],
		},
		alternateEmail: {
			type: String,
			required: [true, "All fields are Required"],
		},
		phone: {
			type: String,
			required: [true, "All fields are Required"],
		},
		alternatePhone: {
			type: String,
			required: [true, "All fields are Required"],
		},
		gender: {
			type: String,
			enum: ["Male", "Female", "Other"],
			required: [true, "All fields are Required"],
		},
		dob: {
			type: Date,
			required: [true, "All fields are Required"],
		},
		diploma: {
			type: String,
			enum: ["Yes", "No"],
			required: [true, "All fields are Required"],
		},
		nationality: {
			type: String,
			required: [true, "All fields are Required"],
		},
		address: {
			type: String,
			required: [true, "All fields are Required"],
		},
		city: {
			type: String,
			required: [true, "All fields are Required"],
		},
		state: {
			type: String,
			required: [true, "All fields are Required"],
		},
		country: {
			type: String,
			required: [true, "All fields are Required"],
		},
		pincode: {
			type: String,
			required: [true, "All fields are Required"],
		},
		cgpa: {
			type: Number,
			required: [true, "All fields are Required"],
		},
		backlogs: {
			type: Number,
			required: [true, "All fields are Required"],
		},
		status: {
			type: String,
			default: registrationStatus.pending,
			required: true,
		},
		studentId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Student",
			unique: true,
			required: [true, "Reference student id is required"],
		},
		// Other fields as before...
		adminComments: [adminCommentSchema], // Array of comments added by admin
		studentComments: [studentCommentSchema], // Array of comments added by student
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("StudentDetails", StudentDetailsSchema);
