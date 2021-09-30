# RESTful Routing
* REST - Representation State Transfer

# Introduction
* Define REST and explain WHY it matters
* List all 7 RESTful routes
* Show examples of RESTful routing in practice

REST - a mapping between HTTP routes and CRUD

C  -  Create
R  -  Read
U  -  Update 
D  -  Delete


RESTFUL ROUTES

Name        Paths           HTTP Verb   Purpose                                             Mongoose Method
=====================================================================================================================
INDEX       /dogs           GET         Displays a list of all dogs                         Dog.find()
NEW         /dogs/new       GET         Displays form to make a new dog                     N/A
CREATE      /dogs           POST        Add new dog to DB                                   Dog.create()
SHOW        /dogs/:id       GET         Shows info about a particular dog                   Dog.findById()
EDIT        /dogs/:id/edit  GET         Show edit form for one dog                          Dog.findById()
Update      /dogs/:id       PUT         Update a particular dog, then redirect somewhere    Dog.findByIdAndUpdate()
Destroy     /dogs/:id       DELETE      Delete a particular dog, then redirect somewhere    Dog.findByIdAndRemove()
