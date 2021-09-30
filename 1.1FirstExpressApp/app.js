// Including express framework
var express = require("express");
// Setting the entire framework to a variable called app
var app = express();

// Making routes
//1. '/' => "Hi there!"
app.get('/', function(req, res){
    res.send("Hi there!");
});

//2. '/bye' => "Goodbye!"
app.get('/bye', function(req, res){
    res.send('Goodbye!!!');
});

//3. '/dog' => "MEOW!" 
app.get('/dog', function(req, res){
    res.send("MEOW!");
});

//4. Learn to use routing parameter
// The params is what we use to specify the value of routing parameter we are using
app.get('/r/:subredditname', function(req, res){
    var subredditName = req.params.subredditname;
    res.send("WELLCOME TO " + subredditName.toUpperCase() + " SUBREDDIT");
});
app.get('/r/:subredditName/comment/:id/:title', function(req,res){
    res.send("WELCOME TO THE COMMENTS PAGE!!");
    // this prints the object(params) holding the routing parameters inside
    console.log(req.params);
});

//NB:: The order of the code really matters. So the (*) should be at the end 
// In order to make a respond to any *other* anonymous route, you can use the star(*)
app.get('*', function(req, res){
    res.send("YOU ARE A STAR!!!");
});

//Before you can make requests, you must tell express to listen for request(start server)
app.listen(3000, function(){
    console.log("Server has started");
});