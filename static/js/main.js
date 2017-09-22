
$('#put-form').on('submit', function(e) {
  console.log(this);
  e.preventDefault();
  var game = $(this);
  var gameUrl = game.attr('action');
  var gameData = game.serialize();
  $.ajax({
    method: 'PUT',
    url: gameUrl,
    data: gameData
  }).done(function(data) {

    window.location = gameUrl;
  });
});

$('.delete-link').on('click', function(e) {
    e.preventDefault();
    var element = $(this);
    var gameUrl = element.attr('href');
    $.ajax({
        method: 'DELETE',
        url: gameUrl
    }).done(function(data) {

        console.log(data);


        window.location = '/';
    });
});
