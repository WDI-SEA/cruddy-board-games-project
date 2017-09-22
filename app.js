// require the modules we need
// STOP: what are these modules? Use online documentation to read up on them.
var express = require('express');
var path = require('path');
var fs = require('fs');
// var ejsLayouts = require("express-ejs-layouts");
var bodyParser = require('body-parser');

var app = express();

// this sets a static directory for the views
app.use(express.static(path.join(__dirname, 'static')));

// using the body parser module
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(ejsLayouts);
app.set('view engine', 'pug');
app.set('view options', {
  layout: false // pug has default layout functionality
});

// your routes here

app.get('/', function(req, res) {
  res.redirect('/games');
});

app.get('/games', function(req, res) {
  var games = fs.readFileSync('./games.json');
  var games = JSON.parse(games);
  res.render('index', {games: games});
});

app.get('/games/new', function(req, res) {
  res.render('new');
});

app.post('/games', function(req, res) {
  var games = JSON.parse(fs.readFileSync('./games.json'));
  var game = {
    name: req.body.name,
    description: req.body.description
  };
  games.push(game);
  console.log(games);
  saveGames(games);
  res.render('index', {games: games})
});

app.get('/games/:name', function(req, res) {
  res.render('show', req.params.name)
});

app.get('/games/:name/edit', function(req, res) {
  var games = JSON.parse(fs.readFileSync('./games.json'));
  var returnGame;
  games.forEach(function(game) {
    if (game !== null && game.name === req.params.name) {
      returnGame = game;
    }
  });
  if (returnGame !== undefined) {
    res.render('edit', {game: returnGame});
  } else {
    res.render('index', {games: games});
  }
});

app.put('/games/:name', function(req, res) {
  var games = JSON.parse(fs.readFileSync('./games.json'));
  games.forEach(function(game) {
    if (game !== null && game.name === req.params.name) {
      console.log(game.name);
      game.name = req.body.name;
      game.description = req.body.description;
    }
  });
  saveGames(games);
  res.redirect(303, '/games');
});

app.delete('/games/:name', function(req, res) {
  var games = JSON.parse(fs.readFileSync('./games.json'));
  games = games.filter(function(game, index) {
    return (game.name !== req.params.name)
  })
  saveGames(games);
  res.render('index', {games: games})
});

app.get('*', function(req, res) {
  res.redirect('/games');
});

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
