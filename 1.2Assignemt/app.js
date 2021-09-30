//  1. Create a brand new express add from scartch
//  2. Create a new package.json using 'npm init' and add expess as a dependency
//  3. In your main app.js file, add 3 different routes:

var express = require('express');
var app = express();

// Visiting "/" should print "Hi there, welcome to my assignment"
// Visiting "/speak/pig" should print "The pig says 'Oink'"
// Visiting "/speak/cow" should print "The cow says 'Moo'"
// Visiting "/speak/dog" should print "The dog says 'Hoof'"
app.get('/', function(req, res){
    res.send('Hi there, welcome to my assignment');
});
app.get('/speak/:animal', function(req, res){
    var sound ={
        dog: 'Hoof',
        cat: 'I hate you humans',
        cow: 'Moo',
        snake: 'Hissing' 
    }
    // we are cnverting every input to lower case to prevent any uppercase problem
    var animal = req.params.animal.toLowerCase;
    // the animal comes out as a string thats why we cant use the dot notation but rather the square selector
    sound = sound[animal];
    res.send('The ' + animal + ' says "' + sound + '"');
});

// Visiting "/repeat/hello/3" should print "Hello Hello Hello"
// Visiting "/repeat/hello/5" should print "Hello Hello Hello Hello Hello"
// Visiting "/repeat/blah/2" should print "Blah Blah"
app.get('/repeat/:message/:times', function(req, res){
    //makes times a number because it is a string
    var count = Number(req.params.times);
    var message = req.params.message;
    var results = "";
    for(var i = 0; i < count; i++){
        results += message + ' ' ;
    }
    // Reason why you can't put the res.send into the loop is because you cant get multiple response on one get
    res.send(results);
});


// If the user visits any other routes, print 'Sorry, page not found.... What are you doing with your life'
app.get('*', function(req, res){
    res.send('Sorry, page not found.... What are you doing with your life')
});
// Adding the listener
app.listen(3300, function(){
    console.log("Server is up and running");
})

