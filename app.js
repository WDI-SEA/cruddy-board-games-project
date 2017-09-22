// require the modules we need
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

app.use(ejsLayouts);
app.set('view engine', 'ejs');

// your routes here

//HOME
app.get('/games', function(req,res) {
  res.render('home', {games: getGames()});
});

//DETAILS
app.get('/games/:name', function(req, res) {
  res.render('details-game', {NOT SURE})
});

//NEW
app.get('/games/new', function(req,res) {
  res.render('create-game', {NOT SURE});
});

//EDIT


//DELETE



// helper functions

// Read list of games from file.
function getGames() {
    var fileContents = fs.readFileSync('./games.json'); // :'(
    var games = JSON.parse(fileContents);
    return games;
};

// Write list of games to file.
function saveGames(games) {
    fs.writeFileSync('./games.json', JSON.stringify(games));
};


// start the server
var port = 3000;
console.log("http://localhost:" + port);
app.listen(port);
