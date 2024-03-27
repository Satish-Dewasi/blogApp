import express  from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB  from "./config/db.js";
import userRoutes from './routes/userRoutes.js'

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
app.use('/api/v1/user', userRoutes)



// listen 
const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{
    console.log(`Server is running in port ${PORT}`);
})

