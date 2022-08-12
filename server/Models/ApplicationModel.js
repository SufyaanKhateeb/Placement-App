const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jobModel = require("./JobPostModel")

const ApplicationSchema = new mongoose.Schema({
    name:{String},
    branch:{String},
    USN:{String},
    email:{String},
    date:{String},
    phone:{String},
    gender:{String},
    cgpa:{String},
    jobs:{}
});

module.exports = mongoose.model("Applications", ApplicationSchema);