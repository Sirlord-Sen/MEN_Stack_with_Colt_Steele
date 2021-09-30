var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// This is used to apply the bodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'))

var friends = ['Charlie', 'Scott', 'Barney', 'Elizabeth', 'James'];

// Getting the home
app.get('/', function(req, res){
    res.render('home')
});

// This is the post method used to grab information from the form
app.post('/addfriend', function(req, res){
    // This is what grabs the name from the form
    var friend = req.body.name;
    // The 'friends.push method is working because, friends have been declared in the public scope
    friends.push(friend);
    // This redirects the page to the /friends page
    res.redirect('/friends');
});

app.get('/friends', function(req, res){
    res.render('friends', {friends : friends});
});

app.listen(3000, function(){
    console.log("You are in!!")
});