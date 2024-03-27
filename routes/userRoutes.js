import express from "express";
import { getAllUsers, loginController, registerController } from "../controller/userControllers.js";

//router object
const router = express.Router();

// get all user 
router.get('/all-users', getAllUsers)

// create new user
router.post('/register', registerController);

// login user
router.post('/login', loginController);

export default router