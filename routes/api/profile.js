const express =require('express');
const mongoose = require('mongoose');
const router =express.Router();
const passport = require('passport');
const Profile = require('../../model/Profile');
const User =require('../../model/User');
const validateProfileInput=require('../../validation/profile');
const validateExpInput=require('../../validation/experience');
const validateEducationInput=require('../../validation/education');
const app =express();
router.use('/test', (req,res) => {
    res.status(200).json({msg:'Profile Routes'});
})
router.get('/',passport.authenticate('jwt',{session:false}), (req,res) => {
    const errors ={};
    
    Profile.findOne({user:req.user.id})
      .then(profile =>{
          if(!profile) {
              errors.noprofile ='there is no profile for this users'
              return res.status(404).json({noprofile:'there is no profile'})
          }
          res.json({profile})
      }).catch(err =>res.status(404).json({err}))
})

router.get('/handle/:handle', (req,res) =>{
const errors ={}

    Profile.findOne({handle: req.params.handle})
    .populate('user',['name','email'])
    .then(profile =>{
        if(!profile) {
            errors.noprofile='There is no Profile for this';
            res.status(404).json(errors);
        }
        res.status(200).json(profile);

    }).catch(err =>res.status(404).json({profile:'There is no profile for this.'}));
})

router.get('/user/:user_id', (req,res) =>{
    const errors ={}
        Profile.findOne({user:req.params.user_id})
        .populate('user',['name','email'])
        .then(profile =>{
            if(!profile) {
                errors.noprofile='There is no Profile for this';
                res.status(404).json(errors);
            }
            res.status(200).json(profile);
    
        }).catch(err =>res.status(404).json({profile:'There is no profile for this.'}));
    })


router.get('/all', (req,res) =>{
        const errors ={}
            Profile.find()
            .populate('user',['name','email'])
            .then(profiles =>{
                if(!profiles) {
                    errors.noprofile='There is no Profiles';
                    res.status(404).json(errors);
                }
                res.status(200).json(profiles);
        
            }).catch(err =>res.status(404).json({profiles:'There is no profiles'}));
        })


router.post('/',passport.authenticate('jwt',{session:false}), (req,res) => {

    const {errors,isValid} =validateProfileInput(req.body);

    if(!isValid) {
        return res.status(400).json({errors})
    }
    const profileFields ={};
    profileFields.user =req.user.id
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;
    if(typeof req.body.skills !== undefined) profileFields.skills =req.body.skills.split(',');

    profileFields.social ={};
    if(req.body.youtube) profileFields.social.youtube =req.body.youtube;
    if(req.body.facebook) profileFields.social.facebook =req.body.facebook;
    if(req.body.twitter) profileFields.social.twitter =req.body.twitter;
    if(req.body.instagram) profileFields.social.instagram =req.body.instagram;

    Profile.findOne({user:req.user.id})
     .then(profile =>{
        //  if profile exist update profile 
         if(profile) {
         Profile.findOneAndUpdate(
             {user:req.user.id},
             {$set:profileFields},
             {new:true}
             ).then(profile =>res.json({profile}));    
         } else {
             Profile.findOne({handle :profileFields.handle})
              .populate('user',['name','avatar','email'])
               .then(profile =>{
                   if(profile) {
                       errors.handle ='That handle already exist';
                       res.status(400).json(errors)
                   }
                new Profile(profileFields)
                   .save()
                      .then(profile =>{
                    res.status(200).json({profile});
                })
               }).catch(err=>res.status(400).json({err}))
         }
     })
})

router.post('/experience', passport.authenticate('jwt',{session:false}), (req,res) => {

    const {errors, isValid} =validateExpInput(req.body);
    if(!isValid) {
        return res.status(400).json(errors)  
    }
    Profile.findOne({user:req.user.id})
      .then(profile =>{
          if(profile) {
              const newExp ={
                  title:req.body.title,
                  company:req.body.company,
                  location:req.body.location,
                  from:req.body.from,
                  to:req.body.to,
                  current:req.body.current,
                  description:req.body.description,
              }
              profile.experience.unshift(newExp);
              profile.save()
                 .then(profile =>{
                     res.status(200).json({profile})
                 })
          }
      })
})
router.post('/education', passport.authenticate('jwt',{session:false}), (req,res) => {

    const {errors, isValid} =validateEducationInput(req.body);
    if(!isValid) {
        return res.status(400).json(errors)  
    }
    Profile.findOne({user:req.user.id})
      .then(profile =>{
          if(profile) {
              const newEdu ={
                  school:req.body.school,
                  degree:req.body.degree,
                  fieldofstudy:req.body.fieldofstudy,
                  from:req.body.from,
                  to:req.body.to,
                  current:req.body.current
              }
              profile.education.unshift(newEdu);
              profile.save()
                 .then(profile =>{
                     res.status(200).json({profile})
                 }).catch(err =>
                    res.json(err))
          }
      })
})

router.delete('/experience/:exp_id', passport.authenticate('jwt',{session:false}), (req,res) => {

    Profile.findOne({user:req.user.id})
      .then(profile =>{
         
        const removeIndex = profile.experience
             .map(item => item.id)
              .indexOf(req.params.exp_id);
        profile.experience.splice(removeIndex,1);

        profile.save().then(profile => res.json({profile}));

      }).catch(err =>res.json(err));
})

router.delete('/education/:edu_id', passport.authenticate('jwt',{session:false}), (req,res) => {

    Profile.findOne({user:req.user.id})
      .then(profile =>{
         
        const removeIndex = profile.education
             .map(item => item.id)
              .indexOf(req.params.edu_id);
        profile.education.splice(removeIndex,1);

        profile.save().then(profile => res.json({profile}));

      }).catch(err =>res.json(err));
})


router.delete('/', passport.authenticate('jwt',{session:false}), (req,res) => {

    Profile.findOneAndRemove({user:req.user.id})
      .then( ()=>{
          User.findOneAndRemove({_id:req.user.id}).then( () =>res.json({success:true}))
      }).catch(err =>res.json(err));
})


module.exports =router
