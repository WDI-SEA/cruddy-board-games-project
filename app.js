// require the modules we need
// STOP: what are these modules? Use online documentation to read up on them.
var express = require('express');
var path = require('path');
var fs = require('fs');
var ejsLayouts = require("express-ejs-layouts");
var bodyParser = require('body-parser');

var app = express();

// this sets a static directory for the views
app.use(express.static(path.join(__dirname, 'static')));

// using the body parser module
app.use(bodyParser.urlencoded({ extended: false }));


app.set('view engine', 'ejs');
app.use(ejsLayouts);

app.get("/", function(req, res){
  res.render("./games/index");///index goes here
})

app.get("/games", function(req, res){
  res.render("./games/index");
})

app.get("/games/new", function(req, res){
  res.render("./games/new");
})

app.get("/games/:names", function(req, res){
  res.render("./games/show");
})

app.get("/games/:names/edit", function(req, res){
  res.render("./games/edit");
})

app.put("/games/:name", function(req, res){
  res.render("update a specific game"); //should use ajax
})

app.post("/games", function(req, res){
  res.render("./games/create");
})

app.delete("/games/:name", function(req, res){
  res.send("deletes a specific game"); //should use ajax
})
// your routes here

// ...

// helper functions

// Read list of games from file.
function getGames() {
    var fileContents = fs.readFileSync('./games.json'); // :'(
    var games = JSON.parse(fileContents);
    return games;
}

// Write list of games to file.
function saveGames(games) {
    fs.writeFileSync('./games.json', JSON.stringify(games));
}

// start the server

var port = 3000;
console.log("http://localhost:" + port);
app.listen(port);
