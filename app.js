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

// helper functions

// Read list of games from file.
function getGames() {
    var fileContents = fs.readFileSync('./games.json'); // :'(
    var games = JSON.parse(fileContents);
    return games;
};
//games is an array of objects containing name and description of games

// Write list of games to file.
function saveGames(games) {
    fs.writeFileSync('./games.json', JSON.stringify(games));
};

// your routes here


//HOME
app.get('/', function(req,res) {
  res.render('home', {games: getGames()});
});


//NEW
app.get('/games/new', function(req,res) {
  res.render('create-game');
});


//DETAILS
app.get('/games/:id', function(req, res) {
  var game = getGames()[req.params.id];
  game.id = req.params.id;
  res.render('details-game', { game: game });
});


//POST
app.post('/games', function(req,res) {
  var games = getGames();
  games.push(req.body);
  // this adds the data to the body of the layout
  saveGames(games);
  //to strinify games for storage as json
  var path = '/games/' +(games.length -1);
  res.redirect(path);
  //takes us back to games
});


//EDIT
app.get('/games/:id/edit', function(req,res) {
  var game = getGames()[req.params.id];
  game.id = req.params.id;
  res.render('edit-game', { game: game });
});


//UPDATE
app.put('/games/:id', function(req,res) {
  var games = getGames();
  games[req.params.id] = req.body;
  saveGames(games);
  res.send(req.body);
});


//DELETE
app.delete('/games/:id', function(req,res) {
  var games = getGames();
// could not figure this out without looking at the complete file
  games[req.params.id] = undefined;
  saveGames(games);
  res.send(req.body);
});


// start the server
// var port = 3000;
// console.log("http://localhost:" + port);
app.listen(3000);
