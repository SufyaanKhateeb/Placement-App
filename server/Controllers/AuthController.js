const UserModel = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const StudentModel = require("../Models/StudentModel");
const CompanyModel = require("../Models/CompanyModel");
const AdminModel = require("../Models/AdminModel");
const JobPostModel = require("../Models/JobPostModel")
var MongoClient = require('mongodb').MongoClient;
const ApplicationModel = require('../Models/ApplicationModel');

const maxAge = 3*24*60*60;

const createToken = (id) => {
    console.log("Token created");
    return jwt.sign({ id },"privateKey",{
        expiresIn:maxAge
    });
}

const handleErrors = (err) => {
    let errors = { userType:"", ID: "", password: "" };

    // console.log(err);
    if (err.message === "incorrect USN") {
        errors.email = "USN not registered";
    }

    if (err.message === "incorrect password") {
        errors.password = "Password Incorrect";
    }

    if (err.code === 11000) {
        errors.email = "USN already registered";
        return errors;
    }

    if (err.message.includes("Users validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
};


module.exports.login = async(req,res,next) => {
    var user;
    try {
        const { userType, ID, password } = req.body;
        // console.log(ID);    
        if(userType === "student"){
            const USN = ID;
            user = await StudentModel.login(USN, password);
            console.log("User accepted");
        } else if (userType === "admin"){
            const AID = ID;
            user = await AdminModel.login(AID, password);
        }else{
            const CID = ID;
            user = await CompanyModel.login(CID, password);
        }
        // console.log(user);

        const token = createToken(user._id);
        
        res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: maxAge * 1000,
        });
        res.json(user);
        res.status(200);
    } catch (err) {
        // console.log(err);
        const errors = handleErrors(err);
        res.json({ errors, created: false });
    }
};


module.exports.register = async (req, res, next) => {
    try{
        console.log(req.body);
        var isVerify = false;
        const {name,USN,email,password,dept} = req.body;
        const user = await StudentModel.create({name,USN,email,password,dept,isVerify});
        console.log(user);
        const token = createToken(user._id);
        console.log("Token: ");
        console.log(token);
        res.cookie("jwt",token,{
            withCredentials:true,
            httpOnly: false,
            maxAge: maxAge*1000,
        });
        res.status(201).json({user:user._id,created:true});
        next();
    }catch(err){
        // console.log(err);
        const errors = handleErrors(err);
        res.json({ errors, created: false });
    }
};

module.exports.jobpost = async(req,res,next) =>{
    try{

        console.log(req.body);
        var myData = new JobPostModel(req.body);
        await myData.save()
            .then(item => {
                res.status(201).json({ user: myData._id, created: true });
            })
            .catch(err => {
                res.status(400).json({created:false});
            });
        next();
    }catch(e){
        console.log(e);
        res.json({e,created:false})
    }
}

module.exports.getjobs = async(req,res,next) => {

    // await MongoClient.connect('mongodb://localhost:27017/', function (err, client) {
    //     if (err) throw err;
    //     var db = client.db('LoginPlacement');
    //     db.collection('jobs').find({}).toArray(function (err, result) {
    //         if (err) {
    //             // res.send(err);
    //             console.log(err);
    //         } else {
    //             res.send(JSON.stringify(result));
    //         }
    //     })
    try {
        const jobs = await JobPostModel.find({})
        res.send(jobs);
    } catch(e) {
        res.json({e,created:false});
    }
// });
    // next();
}

module.exports.getLogin = async(req,res,next) => {
    var user;
    try {
        const { userType, ID, password } = req.body;
        // console.log(ID);    
        if(userType === "student"){
            const USN = ID;
            user = await StudentModel.login(USN, password);
            console.log("User accepted");
        } else if (userType === "admin"){
            const AID = ID;
            user = await AdminModel.login(AID, password);
        }else{
            const CID = ID;
            user = await CompanyModel.login(CID, password);
        }
        // console.log(user)

        res.json(user);
        res.status(200);
    } catch (err) {
        // console.log(err);
        const errors = handleErrors(err);
        res.json({ errors, created: false });
    }
    next();
};

// module.exports.getVerify = async (req, res, next) => {
//     try {

//         console.log(req.body);
//         var myData = new ApplicationModel(req.body);
//         await myData.save()
//             .then(item => {
//                 res.status(201).json({ user: myData._id, created: true });
//             })
//             .catch(err => {
//                 res.status(400).json({ created: false });
//             });
//         next();
//     } catch (e) {
//         console.log(e);
//         res.json({ e, created: false })
//     }
//     next();
// }

// module.export.getApplications = async(req,res,next) => {
//     await MongoClient.connect('mongodb://localhost:27017/LoginPlacement', function (err, db) {
//         if (err) throw err;
//         var applications = db.collection('Applications');
//         applications.find({}).toArray(function (err, result) {
//             if (err) {
//                 res.send(err);
//             } else {
//                 res.send(JSON.stringify(result));
//             }
//         })
//     });
//     next();
// }
