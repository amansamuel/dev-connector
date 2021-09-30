const mongoose =require('mongoose');
const express =require('express');

const router =express.Router();
const passport = require('passport');
const Post =require('../../model/Post');
const Profile =require('../../model/Profile');
const validatePostInput = require('../../validation/post');

router.get('/test', (req,res) =>{
    res.status(400).json({msg:'Testing Post router'});
})

router.get('/', (req,res) => {
    Post.find()
     .sort({date:-1})
     .then(posts =>res.json(posts))
     .catch(err =>res.json(err));
})
router.get('/:post_id', (req,res) => {
 
    Post.findById(req.params.post_id)
     .then(post =>res.json(post))
     .catch(err =>res.json(err));
})

router.post('/',passport.authenticate('jwt',{session:false}), (req,res) => {

    const {errors, isValid} =validatePostInput(req.body);
    if(!isValid) {
        return res.status(400).json(errors)  
    }
    const newPost =new Post({
        text:req.body.text,
        name:req.body.name,
        avatar:req.body.avatar,
        user:req.user.id
    });
    newPost.save()
      .then(post => res.status(200).json(post))
      .catch(err =>res.status(400).json(err))
    
})

router.delete('/:id', passport.authenticate('jwt',{session :false}), (req,res) => {

    Profile.findOne({user:req.user.id})
     .then(profile => {
         Post.findById(req.params.id)
          .then( post =>{
              if(post.user.toString() !== req.user.id) {
                  return res.status(401).json({notauthorized:'User not Authorized'})
              }
              post.remove()
              .then( ()=>res.status(200).json({success:true}))
            })
          .catch(()=>res.status(404).json({postnotfound:'Post not found'}));
     })
})


router.post('/like/:id', passport.authenticate('jwt',{session :false}), (req,res) => {

    Profile.findOne({user:req.user.id})
     .then(profile => {
         Post.findById(req.params.id)
          .then( post =>{
           if(post.likes.filter(like =>like.user.toString() === req.user.id).length > 0) {
               return res.status(400).json({alreadyliked:'user already liked this post'})
           }
           post.likes.unshift({user: req.user.id})
             post.save().then(like => res.json(like))
            })
          .catch(()=>res.status(404).json({postnotfound:'Post not found'}));
     })
})

router.post('/unlike/:id', passport.authenticate('jwt',{session :false}), (req,res) => {

    Profile.findOne({user:req.user.id})
     .then(profile => {
         Post.findById(req.params.id)
          .then( post =>{
           if(post.likes.filter(like =>like.user.toString() === req.user.id).length === 0) {
               return res.status(400).json({notliked:'you are not liked this post'})
           }
           const removeIndex =post.likes
              .map(item =>item.user.toString())
              .indexOf(req.user.id)
            post.likes.splice(removeIndex, 1);

            post.save().then(post => res.json(post))
            })
          .catch(()=>res.status(404).json({postnotfound:'Post not found'}));
     })
})

router.post('/comment/:id',passport.authenticate('jwt',{session:false}), (req,res) => {
    const {errors, isValid} =validatePostInput(req.body);
    if(!isValid) {
        return res.status(400).json(errors)  
    }

    Post.findById(req.params.id)
      .then(post =>{

        const newComment ={
            text:req.body.text,
            name:req.body.name,
            avatar:req.body.avatar,
            user:req.user.id
        }
        post.comment.unshift(newComment);
        post.save()
          .then( comment =>{
              res.status(200).json(comment);
          })
          .catch(() =>res.status(404).json({nocomment:'No comment found'}))
      }).catch(() =>res.status(404).json({nopost:'No Post found'}))
})


router.delete('/comment/:id/:comment_id',passport.authenticate('jwt',{session:false}), (req,res) => {

    Post.findById(req.params.id)
      .then(post =>{

        if(post.comment.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {

            return res.status(404).json({commentnotexists:'Comment does not exist'})
        }
        const removeIndex =post.comment
        .map(item =>item._id.toString())
        .indexOf(req.params.comment_id)

      post.comment.splice(removeIndex, 1);

      post.save().then(post => res.json(post))

      }).catch(() =>res.status(404).json({nopost:'No Post found'}))
})

module.exports =router;