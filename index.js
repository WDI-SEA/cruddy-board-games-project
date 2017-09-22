var express = require('express');
var bodyParser =reuquire('body-parser');
var path = require('path');
var fs = require('fs');
var ejsLayouts = require("express-ejs-layouts");

var app = express();
app.use(ejsLayouts);

app.use(express.static(path.join(__dirname, 'static')));


// GET FUNCITON 
app.get('/boardgames/:id/edit', function(req, res) {
    var game = getGames()[req.params.id];
    game.id = req.params.id;
    res.render('boardgame-edit', { game: game });
});


// PUT FUNCTION
app.put('/boardgames/:id', function(req, res) {
    console.log("body:", req.body);

    var games = getGames();
    games[req.params.id] = req.body;
    saveGames(games);

    res.send(req.body);
});

// DELETE
app.delete('/boardgames/:id', function(req, res) {
    var games = getGames();
    games[req.params.id] = undefined;
    saveGames(games);

    res.send(req.body);



function saveGames(games) {
    fs.writeFileSync('./games.json', JSON.stringify(games));
}

var port = 3000;
app.listen(port);
