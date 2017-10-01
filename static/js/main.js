console.log("JS good to go, sir!");




// listen for a "submit" event for the edit page. the edit form will live
$('[type=button]').on('click', function(e) {
    //e.preventDefault();
    var updateUrl = $(this).attr('editUrl');
    //will take form data and put in article data
    var body = $('#body').serialize();
    // at the path GET /games/:name/edit. Use AJAX to send a PUT request to the
    // appropriate URL
    $.ajax({
      method: 'PUT',
      url: updateUrl,
      data: body
    }).done(function(data) {
      // get data returned from the PUT route
      console.log(data);
    });
  });







// listen for clicks on "delete" links. use AJAX to send a DELETE HTTP request
// to the appropriate URL

$('.delete-game').on('click', function(e){
    //e.preventDefault();
    var deleteUrl = $(this).attr('deleteUrl');
    console.log('deleting');
    $.ajax({
      method:'DELETE',
      url: deleteUrl
    }).done(function(data){
      console.log(data);
    });
});

