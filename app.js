var express = require('express');
var path = require('path');
var fs = require('fs');
var ejsLayouts = require("express-ejs-layouts");
var bodyParser = require('body-parser');

var app = express();
app.use(ejsLayouts);
// this sets a static directory for the views
app.use(express.static(path.join(__dirname, 'static')));

// using the body parser module
app.use(bodyParser.urlencoded({ extended: false }));

app.use(ejsLayouts);
app.set('view engine', 'ejs');


app.get('/', function(req, res){ //homepage
  res.render('homepage', {games: getGames() });

});

app.get('/games/:id', function(req, res) { //individual game info
  var game = getGames()[req.params.id];
  game.id = req.params.id;
  res.render('games', {game: game}); //might not need ./
});

app.get('/games/new/', function(req, res) { //add new game
  res.render('./games-new'); //might not need the game: game
})

app.post('/games', function(req, res) { //post NEW GAME info to list on
  var game = getGames();
  game.push(req.body);
  saveGames(games);

  var path = '/games/' + (games.length - 1);
  res.redirect(path);
})

app.get('/games/:id/edit', function(req, res) { //edit game
  var game = getGames()[req.params.id];
  game.id = req.params.id;
  res.render('./games-edit', {game: game});
});

app.put('/games/:id', function(req, res) { //put game EDIT information
    var game = getGames();
    game[req.params.id] = req.body;
    saveGames(game);
    res.send(req.body);
});

// Delete
app.delete('/games/:id', function(req, res) {
    var games = getGames();
    // Set the index to undefined so every other position isn't screwed up.
    games[req.params.id] = undefined;
    saveGames(games);
    res.send(req.body);
});
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




var port = 3000;
console.log("http://localhost:" + port);
app.listen(port);
