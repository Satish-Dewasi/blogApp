import express  from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB  from "./config/db.js";

//dotenv config
dotenv.config();

//dataabase connection
connectDB();

// rest object
const app = express();

// middlewares
app.use(cors())
app.use(express.json())

// routes
app.get('/', (req, res)=>{
    res.send("Welcome to our blog Application")
})

// listen 
const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{
    console.log(`Server is running in port ${PORT}`);
})

