import userModel from "../models/userModal.js";
import bcrypt from 'bcrypt'


// user resistration
const registerController = async(req, res)=>{
    try {
        const {username, email, password}= req.body;

        // validation 
        if(!username || !email || !password){
            return res.status(400).send({
                success : false,
                message: "please fill all the fields"
            })
        }

        // existing user
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.status(401).send({
                success : false,
                message: "user already exists"
            })
        }

        // password hashing
        const hashedPassword = await bcrypt.hash(password, 10);

        // saving new user
        const user = await new userModel({username, email, password: hashedPassword}).save();
        res.status(201).send({
            success : true,
            message: "successfully registered",
            user
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message: "error in register conntroller",
            error
        })
    }
};


// get all users
const getAllUsers = async(req, res)=>{
    try {

        const users = await userModel.find({});
        res.status(200).send({
            success : true,
            message: "successfully got all the users",
            userCount : users.length,
            users
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message: "error in get allUser conntroller",
            error
        })
    }
};

// user login
const loginController = async(req, res)=>{
    try {

        const {email, password}= req.body;

        // validation 
        if(!email || !password){
            return res.status(400).send({
                success : false,
                message: "please fill all the fields"
            })
        }

        // user didn't existt
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(200).send({
                success : false,
                message: "email is not registered"
            })
        }

        // decrypt password and compare
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
           return res.status(401).send({
                success : false,
                message: "wrong password "
           }) 
        }

        return res.status(200).send({
            success : true,
            message: "login successfully",
            user
            
        })

        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success : false,
            message: "error in login conntroller",
            error
        })
    }
};

export {getAllUsers, registerController, loginController}