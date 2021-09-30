var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog_demo');

// If you are embeding a data, you must define it first
//POST - title, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

var Post = mongoose.model('Post', postSchema);

// USER - email, name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});

var User = mongoose.model('User', userSchema);

// var newUser = new User({
//     email: 'hermione@hogwards.edu',
//     name: 'Hermoine Granger'
// });

// newUser.posts.push({
//     title: "How to brew polyjuice potion",
//     content: "Just kiding. Go to potions class to learn it!"
// });

// newUser.save(function(err, user){
//     if(err){
//         console.log('ERROR!');
//     } else{
//         console.log(user);
//     }
// });

// var newPost = new Post({
//     title: 'Reflections on Apples',
//     content: 'They are delicious'
// });

// newPost.save(function(err, post){
//     if(err){
//         console.log('ERROR!');
//     } else{
//         console.log(post);
//     }
// });

// Retrieve the data
User.findOne({name: "Hermoine Granger"}, function(err, user){
    if(err){
        console.log(err);
    } else{
        user.posts.push({
            title: "3 things I really hate",
            content: "Voldemort. Voldemort. Voldemort."
        });
        user.save(function(err, user){
            if(err){
                console.log(err);
            } else{
                console.log(user);
            }
        });
    }
});