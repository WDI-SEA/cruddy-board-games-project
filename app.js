/ require the modules we need
// STOP: what are these modules? Use online documentation to read up on them.
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

//app.use(ejsLayouts);
app.set('view engine', 'ejs');

// your routes here
app.get('/', function(req, res){
	res.render('main', { games: getGames() });
});
// ...

// helper functions
// new
app.get('/boardgames/new', function(req, res) {
    res.render('game-create');
});

// show
app.get('/game/:id', function(req, res) {
    var game = getGames()[req.params.id];
    game.id = req.params.id;
    res.render('game-detail', { game: game });
});

// post
app.post('/game', function(req, res) {
    var games = getGames();
    games.push(req.body);
    saveGames(game);

    var path = '/game/' + (games.length - 1);
    res.redirect(path);
});

// Update page
app.get('/boardgames/:id/edit', function(req, res) {
    var game = getGames()[req.params.id];
    game.id = req.params.id;
    res.render('game-edit', { game: game });
});

// update
app.put('/boardgames/:id', function(req, res) {
    console.log("body:", req.body);

    var games = getGames();
    games[req.params.id] = req.body;
    saveGames(games);

    res.send(req.body);
});

// Delete
app.delete('/boardgames/:id', function(req, res) {
    var games = getGames();

    // Set the index to undefined so every other position isn't screwed up.
    games[req.params.id] = undefined;
    saveGames(games);

    res.send(req.body);
});

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
