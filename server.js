const express =require('express');
const mongoose =require('mongoose');
const port =5000;
const passport =require('passport');
const bodyParser =require('body-parser');
const path = require('path')
const app =express();

// middleware

const db=require('./config/keys').mongoURI;
const routerUser =require('./routes/api/user');
const routerProfile =require('./routes/api/profile');
const routerPost =require('./routes/api/Post');
mongoose.connect(db,{ useUnifiedTopology: true,useNewUrlParser: true })
        .then(console.log('Database connected successfully'))
        .catch(err =>console.log(err));
app.use(passport.initialize())

if(process.env.NODE_ENV === 'production') {
   app.use(express.static('client/build'))
        } 

require('./config/passport')(passport)
        
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.get('/',(req,res) =>console.log('Home working server'));

app.use('/api/users',routerUser);
app.use('/api/profile',routerProfile);
app.use('/api/post',routerPost);
// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
        // Set static folder
        app.use(express.static('client/build'));
      
        app.get('*', (req, res) => {
          res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
        });
      }
app.listen(port,(req,res) =>console.log(`server running on server ${port}`))
