console.log("JS good to go, sir!");

// listen for clicks on "delete" links. use AJAX to send a DELETE HTTP request
// to the appropriate URL


//DELETE AJAX
$('.delete').on('click', function(e) {
  e.preventDefault();
  var toDelete = $(this);
  var deleteUrl = toDelete.attr('href');
  $.ajax({
    method: 'DELETE',
    url: deleteUrl
  }).done(function(data) {
    console.log(data);
    window.location = '/';
  });
});


// listen for a "submit" event for the edit page. the edit form will live
// at the path GET /games/:name/edit. Use AJAX to send a PUT request to the
// appropriate URL


//PUT AJAX

$('.put-form').on('submit', function(e) {
  e.preventDefault();
  var updateElement = $(this);
  var updateUrl = updateElement.attr('action');
  var updatedData = updateElement.serialize();
  $.ajax({
    method: 'PUT',
    url: updateUrl,
    data: updatedData
  }).done(function(data) {
      console.log(data);
      window.location = url;
  });
});
