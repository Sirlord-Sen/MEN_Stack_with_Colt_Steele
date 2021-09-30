var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog_demo_2');

// If you are embeding a data, you must define it first
// If you are using a current working directory, we use './'
var Post = require('./models/post');
// requiring the exported user model
var User = require('./models/user');


//This is used to create a post and push it into a user
// Post.create({
//     title: "How to cook the best burger pt. 4",
//     content: "Jesus is Lord!!!"
// }, function(err, post){
//     User.findOne({email: "bob@gmail.com"}, function(err, foundUser){
//         if(!err){
//             foundUser.posts.push(post);
//             foundUser.save(function(err, data){
//                 if(err){
//                     console.log('ERROR!')
//                 } else{
//                     console.log(data);
//                 }
//             })
//         }
//     })
// });

// User.create({
//     email: "bob@gmail.com",
//     name: "Bob Belcher"
// }, function(err, user){
//     if(err){
//         console.log("error");
//     } else{
//         console.log(user);
//     }
// });

// Find user
// Find all posts for that user

User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user){
    if(!err){
        console.log(user);
    }
});
