const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./Router/authRoutes");
const cookieParser = require("cookie-parser");

const app = express();
require("dotenv").config();

app.listen(3010, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Server Started Successfully.");
    }
});

const uri = process.env.MONGODB_URL;

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose
    .connect(uri, connectionParams)
    .then(() => {
        console.log("Connected to the database ");
    })
    .catch((err) => {
        console.error(`Error connecting to the database. ${err}`);
    });

app.use(
    cors({
        origin: `${process.env.CLIENT_URL}`,
        methods: ["GET", "POST"],
        credentials: true,
    })
);
app.use(cookieParser());

app.use(express.json());
app.use("/", authRoutes);
