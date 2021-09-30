// Requiring Mongoose
var mongoose = require("mongoose");
//Connecting mongoose to mongoDB and creating a new DB called cat_app
mongoose.connect("mongodb://localhost/catem_app");

//Creating a Schema 
var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

// creating a model and putting it into a variable
var Cat = mongoose.model("Cat", catSchema);

//adding a new cat to the DB

//var george = new Cat({
//    name: "George",
//    age : 11,
//    temperament: "Grouchy" 
//});

// This is how to save the object into the database and passing in a callback function

//george.save(function(err, cat){
//    if(err){
//        console.log("Something went wrong!")
//    } else{
//        console.log("We just saved a cat to the DB:")
//        console.log(cat);
//    }
//});

// This is how to create and save an object easily

//Cat.create({
//    name: "Pussy",
//    age: 6,
//    temperament: "Angry"
//}, function(err, cat){
//    if(err){
//        console.log(err);
//    } else{
//        console.log("Updated!!");
//    }
//});

// Retrieve all cats from the DB and console.log each one
Cat.find({}, function(err, cats){
    if(err){
        console.log("OH NO, ERROR!");
        console.log(err);
    } else{
        console.log("ALL THE CATS....");
        console.log(cats);
    }
})