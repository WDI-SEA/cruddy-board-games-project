// require the modules we need
// STOP: what are these modules? Use online documentation to read up on them.
var express = require('express');
var path = require('path');
var fs = require('fs');
var ejsLayouts = require("express-ejs-layouts");
var bodyParser = require('body-parser');

var app = express();

// this sets a static directory for the views
app.use(express.static(path.join(__dirname, '/static/')));

// using the body parser module
app.use(bodyParser.urlencoded({ extended: false }));

app.use(ejsLayouts);
app.set('view engine', 'ejs');

// your routes here
app.get('/games',function(req,res){
	var games = getGames();
	res.render('index', { games: games });
	// res.send(games);
});


app.get('/games/new', function(req,res){
	res.sendfile('static/new.html');
});

app.post('/games/new', function(req,res){
	games = getGames();
	games.push(req.body);
	saveGames(games);
	
	res.render('index', { games: games });
});

app.get('/games/:idx',function(req,res){
	
	var games = getGames();
	res.render('show',{ games: games, index: req.params.idx });
	// res.send(games);
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

// start the server

var port = 3000;
console.log("http://localhost:" + port);
app.listen(port);
