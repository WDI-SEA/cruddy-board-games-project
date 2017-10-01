// require the modules we need
// STOP: what are these modules? Use online documentation to read up on them.
var express = require('express');
var path = require('path');
var fs = require('fs');
var ejsLayouts = require("express-ejs-layouts");
var bodyParser = require('body-parser');
// var rowdy = require('rowdy-logger');

var app = express();

// this sets a static directory for the views
app.use(express.static(path.join(__dirname, 'static')));

// using the body parser module
app.use(bodyParser.urlencoded({ extended: false }));

app.use(ejsLayouts);
app.set('view engine', 'ejs');

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

// calling Read list of games from file.
var games = getGames();
// console.log("here is where I am reciving games:", games);

// route to home page
app.get('/', function(req, res){
  res.render('home');
})
//display a list of all games
app.get('/games', function(req, res) {
  // Read list of games from file.
  // console.log("games:", games);
  res.render('games/show', {games: games});
});
//return HTML form for creating a new game
app.get('/games/new', function(req, res){
  res.render('games/boardgame-create');
});
//create a new game (using form data from games/new)
app.post('/games', function(req, res){
  games.push(req.body);
  // console.log(games);
  saveGames(games);
  res.redirect('/games');
});
//display a specific game
app.get('/games/:gameName', function(req, res){
  var gameName = req.params.gameName;
  var game = games.filter(function(game){
    return game.name === gameName;
  }).pop();
  // console.log('game to show:', game);
  res.render('games/specific-game', {game: game});
});
//delete specific game
app.delete('/games/:name', function(req, res) {
  var gameToDelete = req.params.name;
  console.log('removing this game:' + gameToDelete);
  games = games.filter(function(game){
    return (game.name !== gameToDelete);
  });
  saveGames(games);
  res.redirect('/games');
});

 //update/edit a specific game
app.put('/games/:name', function(req, res){
  console.log('game name: ',req.params.name);
  console.log('game body: ',req.body.description);
  var gameToEdit = req.params.name;
  var game = games.filter(function(game){
    return game.name === gameToEdit;
  }).pop();
  game.description = req.body.description;
  

  // console.log(games);
  saveGames(games);
  console.log('all games: ', games);
  // res.redirect('/games');
});

//return HTML form for editing a game
app.get('/games/:name/edit', function(req, res){
  console.log('editing game' + req.params.name);
  var gameName = req.params.name;
  var game = games.filter(function(game){
    return game.name === gameName;
  }).pop();
 res.render('games/boardgame-edit', {game: game});
});







// start the server

var port = 3000;
console.log("http://localhost:" + port);
app.listen(port);
