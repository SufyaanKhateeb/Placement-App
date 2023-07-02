const mongoose = require("mongoose");

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

        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Students",
            required: [true, "Reference student id is required"],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("StudentDetails", StudentDetailsSchema);
