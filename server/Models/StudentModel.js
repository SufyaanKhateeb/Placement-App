const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const studentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Name is Required"],
    },
    USN: {
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
    dept:{
        type: String,
        required: [true, "Password is Required"],
    },
    isVerified:{
        type:Boolean,
    }
});

studentSchema.pre("save", async function (next) {
    // console.log("Hello");
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

studentSchema.statics.login = async function (USN, password) {
    const user = await this.findOne({ USN });
    if (user) {
        console.log("Found User");
        // console.log(user);
        const auth = await bcrypt.compare(password, user.password);
        // console.log(auth);
        if (auth) {
            // console.log("Auth successful");
            return user;
        }
        throw Error("Incorrect Password");
    }
    throw Error("Incorrect USN");
};

module.exports = mongoose.model("Students", studentSchema);