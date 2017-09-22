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

app.use(ejsLayouts);
app.set('view engine', 'ejs');

function getGames() {
    var fileContents = fs.readFileSync('./games.json'); // :'(
    var games = JSON.parse(fileContents);
    return games;
}

var games = getGames();

// your routes here
//pass data to template res.render
app.get('/', function(req, res) {
  res.render('layout', {games: games});
});

app.delete('/games/:name', function(req, res) {
  var gameToDelete = req.params.name;
  games = games.filter(function(element){
    return element.name !== gameToDelete;
  })
});



// helper functions

// Read list of games from file.


// Write list of games to file.
function saveGames(games) {
    fs.writeFileSync('./games.json', JSON.stringify(games));
}

// start the server

var port = 3000;
console.log("http://localhost:" + port);
app.listen(port);
