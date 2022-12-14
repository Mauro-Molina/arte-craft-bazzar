const router = require("express").Router();
const mongoose = require("mongoose");
const Post = require("../models/Posts.model");

//post-list
router.get("/post", (req, res) => {
    Post.find()
    .then((post) => {
      res.render("post/post", {post: post});
    });
  });

  //get-create
router.get("/create", (req, res) => {
  res.render("post/form-create")
})

//post-create/
router.post("/create", (req, res)=>{
  Post.create(req.body)
  .then(newPost =>{
      res.redirect("/post/post")
  })
})

//id-post
router.get("/:postId", (req, res) => {
    Post.findById(req.params.postId)
    .then(details => {
      res.render("post/details", details)   
    });
})



//edit post

router.get("/:id/edit", (req, res)=>{
  Post.findById(req.params.id)
  .then((post)=>{
      res.render("post/edit", post)
  })
})


router.post("/:id/edit", (req,res)=>{
  Post.findByIdAndUpdate(req.params.id, req.body,{new: true})
  .then((postUpdate)=>{
      res.redirect(`/post/${req.params.id}`)
  })
  .catch((err) => console.log(err))
})


//delete post
router.post("/:postId/delete", (req,res)=>{
  Post.findByIdAndDelete(req.params.postId)
  .then((result) =>{
      res.redirect("/post/post")
  })
})

module.exports = router;
  
