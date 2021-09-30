var express = require('express');
var app = express();

// This is used to serve the public directory that contains the css file
app.use(express.static('public'));
// This tells the app that all the render files are ejs files
app.set('view engine', 'ejs');

// This renders the ejs file with the html in it
app.get('/', function(req, res){
    res.render('home');
});

// This is a simple way of making your html dynamic
app.get("/fallinlovewith/:thing", function(req, res){
    var thing = req.params.thing;
    // This is where the 'thing' variable is exported to fit the name used in the 'home.ejs' file.
    res.render('love', {thingVar : thing});
});

// Running a loop in the logic
app.get('/posts', function(req, res){
    var posts = [
        {title: 'Post 1', author: 'Charlie'},
        {title: 'My adorable pet bunny', author: 'Sussy'},
        {title: 'CAn you believe this pomsky?', author: 'Colt'}
    ];
    res.render('posts', {posts: posts});
});


//listening for the request being made
app.listen(3100, function(){
    console.log("Server is up and running!!!")
});