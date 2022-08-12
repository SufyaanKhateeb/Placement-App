const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const companySchema = new mongoose.Schema({
    CID: {
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
});

companySchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

companySchema.statics.login = async function (CID, password) {
    const user = await this.findOne({ CID });
    console.log(user);
    if (user) {
        return user;
    }
    throw Error("incorrect email");
};

module.exports = mongoose.model("Company", companySchema);