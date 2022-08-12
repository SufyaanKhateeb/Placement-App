const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./Router/authRoutes");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion } = require('mongodb');


const app = express();

app.listen(4000, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Server Started Successfully.");
    }
});

const uri = "mongodb+srv://pawan03:ch3coo-k+@cluster0.tkqqzlx.mongodb.net/?retryWrites=true&w=majority";

const connectionParams = {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
}

mongoose.connect(uri, connectionParams)
    .then(() => {
        console.log('Connected to the database ')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. n${err}`);
    })

app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
    })
);
app.use(cookieParser());

app.use(express.json());
app.use("/", authRoutes);