const UserModel = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const StudentModel = require("../Models/StudentModel");
const CompanyModel = require("../Models/CompanyModel");
const AdminModel = require("../Models/AdminModel");


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
        res.status(200).json({ user: user._id,create:true });
    } catch (err) {
        // console.log(err);
        const errors = handleErrors(err);
        res.json({ errors, created: false });
    }
};


module.exports.register = async (req, res, next) => {
    try{
        console.log(req.body);
        const {name,USN,email,password,dept} = req.body;
        const user = await StudentModel.create({name,USN,email,password,dept});
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