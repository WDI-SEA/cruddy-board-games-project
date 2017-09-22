console.log("JS good to go, sir!");

// listen for clicks on "delete" links. use AJAX to send a DELETE HTTP request
// to the appropriate URL


//DELETE AJAX
$('.delete').on('click', function(e) {
  var toDelete = $(this);
  var deleteUrl = toDelete.attr('href');
  $.ajax({
    method: 'DELETE',
    url: deleteUrl
  }).done(function(data){
    console.log(data);
    res.redirect('/');
  });
});


// listen for a "submit" event for the edit page. the edit form will live
// at the path GET /games/:name/edit. Use AJAX to send a PUT request to the
// appropriate URL


//PUT AJAX
