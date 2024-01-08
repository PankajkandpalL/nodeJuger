const express = require("express");
const { postModel } = require("../models/posts.model");
const { auth } = require("../middleware/auth.middleware");

const postRoute = express.Router();

postRoute.get("/get", async(req, res)=>{
  try {
      const posts = await postModel.find();
      res.status(200).send(posts);
  
  } catch (err) {
    res.status(400).send({ "error": err.message });
  }
})
postRoute.post("/add", async(req, res)=>{
  try {
    const newPost = new postModel(req.body);
    await newPost.save();
    res.status(201).send({ "msg": 'Post added'});
  } catch (err) {
    res.status(400).send({ "error": err.message });
  }
})
postRoute.patch("/update/:id", auth, async(req, res)=>{
    const { id } = req.params;
  const { title, content } = req.body;

  try {
    const updatedPost = await postModel.findByIdAndUpdate(id, { title, content }, { new: true });

    if (!updatedPost) {
       res.status(404).send({ "error": 'Post not found' });
    }else{
        res.status(200).send({ "msg": 'Post updated', "post": updatedPost });
    }
  } catch (err) {
    res.status(400).send({ "error": err.message });
  }
})
postRoute.delete("/delete/:id", auth, async(req, res)=>{
    const { id } = req.params;

    try {
      const deletedPost = await postModel.findByIdAndDelete(id);
      if (!deletedPost) {
         res.status(404).send({ 'error': 'Post not found' });
      }else{
        res.status(200).send({ 'msg': 'Post deleted', 'post': deletedPost });
      }
    } catch (err) {
      res.status(400).send({ "error": err.message });
    }
})

module.exports={postRoute}