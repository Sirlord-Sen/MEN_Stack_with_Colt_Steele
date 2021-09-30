var express               = require('express'),
    app                   = express(),
    mongoose              = require('mongoose'),
    // This is the authentication middleware for Node
    passport              = require('passport'),
    bodyParser            = require('body-parser'),
    LocalStrategy         = require('passport-local'),
    //This package generates salts and hashes the password for you
    passportLocalMongoose = require('passport-local-mongoose'),
    User                  = require('./models/user');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
mongoose.connect('mongodb://localhost/auth_demo_app', {useNewUrlParser: true, useUnifiedTopology: true});

// This is a way of requiring the middleware and using at the same time
app.use(require('express-session')({
    secret: 'Rusty is the best and cutest dig in the world',
    resave: false,
    saveUninitialized: false
}));

// This is to initialize passport so that express can yuse it
app.use(passport.initialize());
// This is to enable use to use passport for our express sessions
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


///////////
// ROUTES
///////////
app.get('/', function(req, res){
    res.render('home');
});

app.get('/secret', isLoggedIn , function(req, res){
    res.render('secret');
});

// AUTH ROUTE
// show sign_up form
app.get('/register', function(req, res){
    res.render('register');
});

app.post('/register', function(req, res){
    // register method, which will register (and hide the password)
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('register');
        }
        //first parameter in there is the strategy you are going to be using 'local'
        passport.authenticate('local')(req, res, function(){
            res.redirect('/secret');
        });
    })
});

//Login route
app.get('/login', function(req, res){
    res.render('login');
});

app.post('/login',passport.authenticate('local', {
    successRedirect: '/secret',
    failureRedirect: '/login'
}) ,function(req, res){

});

app.get('/logout', function(req, res){
    req.logOut();
    res.redirect('/');
});

// Create an isLoggedIn middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

app.listen(3000, function(){
    console.log('Server started....')
})