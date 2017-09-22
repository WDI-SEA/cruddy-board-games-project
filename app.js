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

app.get('/', function(req, res) {
  res.render('index', { games: getGames() });
});

app.get('/games/new', function(req, res){
  res.render('newGame');
});

app.get('/games/:id', function(req, res) {
    var game = getGames()[req.params.id];
    game.id = req.params.id;
    res.render('detailGame', { game: game });
});

app.get('/games/:id/:edit', function(req, res){
  var game = getGames()[req.params.id];
    game.id = req.params.id;
    res.render('editGame', { game: game });
});

app.post('/games', function(req, res) {
    var games = getGames();
    games.push(req.body);
    saveGames(games);
    var path = '/games/' + (games.length - 1);
    res.redirect(path);
});

app.put('/games/:id', function(req, res) {
    var games = getGames();
    games[req.params.id] = req.body;
    saveGames(games);
    res.send(req.body);
});

app.delete('/games/:id', function(req, res) {
    var games = getGames();
    console.log('working');
   games[req.params.id] = undefined;
    saveGames(games);
    res.send(req.body);
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
