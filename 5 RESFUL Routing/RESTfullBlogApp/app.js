var express         = require('express'),
    app             = express(),
    bodyParser      = require('body-parser'),
    expressSanitizer= require('express-sanitizer')
    methodOverride  = require('method-override'),
    mongoose        = require('mongoose');

mongoose.connect("mongodb://localhost/restful_blog_app", { useNewUrlParser: true });
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
//Only requirement is that expressSAnitizer has to come after bodyParser
app.use(expressSanitizer());
// This is used to set up what method-override should look for
app.use(methodOverride('_method'));

//MONGOOSE/MODEL/ Config 
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    // This is used to set the type as date and set default as the current date
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model('Blog', blogSchema);

// This was to create a new blog
// Blog.create({
//     title: 'Test Blog', 
//     image: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60', 
//     body: 'HELLO THIS IS A BLOG POST'
// })

// RESTFUL ROUTES

// Root route
app.get('/', function(req, res){
    res.redirect('/blogs');
});

//1. INDEX
app.get('/blogs', function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log("ERROR!");
        } else{
            res.render('index', {blogs: blogs});
        }
    });
});

// 2. NEW
app.get('/blogs/new', function(req, res){
    res.render('new');
});

//3. CREATE
app.post('/blogs', function(req, res){
    var title   = req.body.title,
        image   = req.body.image,
        body    = req.body.body;
      
    body = req.sanitize(body);
    var newPost = {title: title, image: image, body: body};
    Blog.create(newPost, function(err, newlyCreated){
        if(err){
            res.render('new');
        } else{
            res.redirect('/blogs');
        }
    });    
        
});

//4. SHOW
app.get('/blogs/:id', function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect('/blogs');
        } else{
            res.render('show', {Blog: foundBlog});
        }
    });
});

//5. EDIT
app.get('/blogs/:id/edit', function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect('.blogs');
        } else{
            res.render('edit', {blog: foundBlog});
        }
    });
});

//6. UPDATE
app.put('/blogs/:id', function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    //Use the method findbyIdAndUpdate which takes in three arguments (id, new data, callback)
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect('/blogs');
        }else{
            res.redirect('/blogs/' + req.params.id);
        }
    });
});

//7. DELETE
app.delete('/blogs/:id', function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('/blogs');
        } else{
            res.redirect('/blogs');
        }
    });
}); 

app.listen(3000, function(){
    console.log("Server is running");
});