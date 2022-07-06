const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema({
    AID: {
        type: String,
        required: [true, "AID is Required"],
        unique: true,
    },
    name: {
        type: String,
        required: [true, "Name cannot be empty"]
    },
    dept: {
        type: String,
        required: true
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

adminSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

adminSchema.statics.login = async function (AID, password) {
    const user = await this.findOne({ AID });
    if (user) {
        // const auth = await bcrypt.compare(password, user.password);
        if (user.password == password) {
            return user;
        }
        throw Error("Incorrect password");
    }
    throw Error("Incorrect Admin ID");
};

module.exports = mongoose.model("Admin", adminSchema);