const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const companySchema = new mongoose.Schema({
    cid: {
        type: String,
        required: [true, "Company ID is Required"],
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

companySchema.statics.login = async function (cid, password) {
    const user = await this.findOne({ cid });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error("Incorrect password");
    }
    throw Error("incorrect Company ID");
};

module.exports = mongoose.model("Company", companySchema);
