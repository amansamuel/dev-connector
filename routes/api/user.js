const express =require('express');
const bcrypt =require('bcryptjs');
const router=express.Router();
const User=require('../../model/User');
const jwt =require('jsonwebtoken');
const { isMatch } = require('lodash');
const keys =require('../../config/keys').SecretOrKey;
const passport = require('passport');
const validateRegisterInput =require('../../validation/register');
const validateLoginInput =require('../../validation/login');
router.get('/test',(req,res)=>{
    res.json({msg:'users testing'});
});
router.post('/register',(req,res) =>{

const {isValid,errors} = validateRegisterInput(req.body);

if(!isValid) {
    return res.status(400).json({errors})
}

    User.findOne({email:req.body.email})
      .then(user =>{
        if(user){
            errors.email ='Email already exist please try another Email account';
            return res.status(400).json({errors});
        } else{
            const newUser =new User({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password
            })
            console.log(newUser)
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if (err){
                      return res.status(400).json({err});
                  };
                  newUser.password = hash;
                  newUser
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log({err}));
                });
              });
        }
    });
});

router.post('/login',(req,res) =>{
    const {isValid,errors} = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json({errors})
    }
    const email=req.body.email;
    const password =req.body.password;

    User.findOne({email}).then(user => {
        errors.email='Email Not found';
         if(!user) {
             return res.status(404).json({errors})
         }
         bcrypt.compare(password,user.password)
           .then(isMatch => {
               if(isMatch) {
                
                const payload ={id:user.id, name:user.name,avatar:user.avatar}

                jwt.sign(
                    payload,
                    keys,
                    {expiresIn:3600},
                     (err,token) =>{
                         res.json({
                             success:true,
                             token:'Bearer '+ token
                         })
                })

               } else {
                   errors.password ="Password is Incorrect"
                   return res.status(400).json({errors})
               }

           })
     });
})

router.get('/current', passport.authenticate('jwt', {session:false}), (req,res) =>{
    res.json({
        id:req.user.id,
        name:req.user.name,
        avatar:req.user.avatar,
        email:req.user.email
    })
})

module.exports =router