const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const studentSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Name is Required"],
	},
	usn: {
		type: String,
		required: [true, "USN is Required"],
		unique: true,
	},
	email: {
		type: String,
		required: [true, "Email is Required"],
		unique: true,
	},
	password: {
		type: String,
		required: [true, "Password is Required"],
	},
	dept: {
		type: String,
		required: [true, "Department is Required"],
	},
	isVerified: {
		type: Boolean,
		required: [true, "Verification field is Required"],
	},
});

studentSchema.pre("save", async function (next) {
	const userExists = await StudentModel.exists({ usn: this.usn });
	if (userExists) throw new Error("User already exists");
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

studentSchema.statics.login = async function (usn, password) {
	const user = await this.findOne({ usn });
	if (user) {
		const auth = await bcrypt.compare(password, user.password);
		if (auth) {
			return user;
		}
		throw Error("Incorrect password");
	}
	throw Error("Incorrect USN");
};

const StudentModel = mongoose.model("Student", studentSchema);
module.exports = mongoose.model("Student", studentSchema);
