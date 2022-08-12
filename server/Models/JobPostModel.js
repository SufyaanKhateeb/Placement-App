const mongoose = require("mongoose");

const JobPostSchema = new mongoose.Schema({
    company :{type: String},
    location :{type: String},
    desc:{type: String},
    role:{type: String},
    link:{type: String},
    deadline:{type: String},
    eligibility:{type: String},
    ctc:{type: String}
});

module.exports = mongoose.model("Jobs", JobPostSchema);

