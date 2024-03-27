import userModel from "../models/userModal.js";
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

        // saving new user
        const user = await new userModel({username, email, password}).save();
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
const getAllUsers = ()=>{};

// user login
const loginController = ()=>{};

export {getAllUsers, registerController, loginController}