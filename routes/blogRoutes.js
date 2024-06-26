import express from 'express'
import { createBlogController, deleteBlogController, 
         getAllBlogController, getBlogByIdController, 
         updateBlogController, 
         userBlogController} from '../controller/blogController.js';

// router object
const router = express.Router();

//routes

// get all blogs
router.get('/all-blogs', getAllBlogController);

// create blog
router.post('/create-blog', createBlogController);

// update blog
router.put('/update-blog/:id', updateBlogController);

// delete blog
router.delete('/delete-blog/:id', deleteBlogController);

// get single blog
router.get('/get-blog/:id', getBlogByIdController);


//user blogs
router.get('/user-blog/:id', userBlogController);

export default router