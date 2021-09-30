var express = require('express');
var app = express();
var request = require('request');

request('http://www.google.com', function(error, response, body){
    
        console.log(body);
});

app.listen(3000, function(){
    console.log('You are up!!!');
})