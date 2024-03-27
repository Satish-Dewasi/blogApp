import blogModel from "../models/blogModel.js";

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
       const {title, description, image}= req.body;
       
       //validation
       if(!title || !description || !image){
          return res.status(200).send({
            success : false,
            message: "Please provide all the feilds",
        })
       }
       // adding new blog
       const newBlog = await new blogModel({title, description, image}).save();
  
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
        res.status(500).send({
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

        await blogModel.findByIdAndDelete(id);

        return res.status(200).send({
            success : true,
            message: "blog deleted",
        });
        
     } catch (error) {
        console.log(error);
        res.status(500).send({
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
        res.status(500).send({
            success : false,
            message: "error in get blog by id conntroller",
            error
        })
     }
}

export {
       getAllBlogController, createBlogController,
       updateBlogController, deleteBlogController, 
       getBlogByIdController
    }

