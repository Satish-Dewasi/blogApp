import mongoose from "mongoose";
import blogModel from "../models/blogModel.js";
import userModel from "../models/userModal.js";

// get all blogs
const getAllBlogController = async(req, res)=>{
     try {

        const blogs = await blogModel.find({});
        if(!blogs){
            return res.status(200).send({
                success : false,
                message: "No blog found"
            })
        }

        return res.status(200).send({
            success : true,
            message: "successfully get all the blogs",
            blogCount : blogs.length,
            blogs
        })
        
        
     } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message: "error in all Blogs controller",
            error
        })
     }
}

// create blog
const createBlogController = async(req, res)=>{
     try {
       const {title, description, image, user}= req.body;
       
       //validation
       if(!title || !description || !image || !user){
          return res.status(200).send({
            success : false,
            message: "Please provide all the feilds",
        })
       }
       
       // validating user
       const existingUser = await userModel.findById(user);
       if(!existingUser){
          return res.status(404).send({
               success : false,
               message: "unable to find user",
          })
       }

       // creating new blog
       const newBlog = new blogModel({title, description, image, user});
       
      // creating mongoose session
      const session = await mongoose.startSession();   //created
      session.startTransaction();      // start
      await newBlog.save({session});     //saving using session
      existingUser.blogs.push(newBlog);
      await existingUser.save({session});
      await session.commitTransaction();     //ending session

      // saving blog
       await newBlog.save();
       return res.status(200).send({
            success : true,
            message: "blog created",
            newBlog
        })
 
     } catch (error) {
        console.log(error);
        return res.status(500).send({
            success : false,
            message: "error in create blog conntroller",
            error
        })
     }
}

// update blog
const updateBlogController = async(req, res)=>{
     try {
        const {id} = req.params;

        const blog = await blogModel.findByIdAndUpdate(id, {...req.body}, {new: true});

        return res.status(200).send({
            success : true,
            message: "blog updated",
            blog
        });
        
     } catch (error) {
        console.log(error);
        return res.status(500).send({
            success : false,
            message: "error in update blog conntroller",
            error
        })
     }
}

// delete blog
const deleteBlogController = async(req, res)=>{
     try {
        const {id} = req.params;

        const blog = await blogModel.findByIdAndDelete(id).populate('user');
        await blog.user.blogs.pull(blog);
        await blog.user.save();

        return res.status(200).send({
            success : true,
            message: "blog deleted",
        });
        
     } catch (error) {
        console.log(error);
        return res.status(500).send({
            success : false,
            message: "error in delete blog conntroller",
            error
        })
     }
}

// get single blog
const getBlogByIdController = async(req, res)=>{
     try {

        const {id} = req.params;

        const blog = await blogModel.findById(id);

        if(!blog){
            return res.status(404).send({
                success : false,
                message: "blog not found",
            })
        }

        return res.status(200).send({
            success : true,
            message: "blog found",
            blog
        });
        
     } catch (error) {
        console.log(error);
        return  res.status(500).send({
            success : false,
            message: "error in get blog by id conntroller",
            error
        })
     }
}

// userBlogController

const userBlogController = async (req, res)=>{
    try {

        const userBlog = await userModel.findById(req.params.id).populate('blogs');

        if(!userBlog){
          return res.status(404).send({
             success : false,
             message: "blog not found with this id",
          })
        }

       return res.status(200).send({
            success : true,
            message: "user blog",
            blogCount : userBlog.blogs.length, 
            userBlog
       })
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success : false,
            message: "error in get blog of user",
            error
        })
    }
}

export {
       getAllBlogController, createBlogController,
       updateBlogController, deleteBlogController, 
       getBlogByIdController, userBlogController
    }

