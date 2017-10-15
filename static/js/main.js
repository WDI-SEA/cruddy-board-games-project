console.log("JS good to go, sir!");

// listen for a "submit" event for the edit page. the edit form will live
// at the path GET /games/:name/edit. Use AJAX to send a PUT request to the
// appropriate URL

// code here ...

// listen for clicks on "delete" links. use AJAX to send a DELETE HTTP request
// to the appropriate URL

// code here ...

$('#edit').on('submit', function(e) {
	e.preventDefault();
	var form = $(this);
	var url = form.attr('action');
	var data = form.serialize();
	$.ajax({
		method: 'put',
		url: url,
		data: data
	}).done(function(data) {
		consol.log(data);
	})
	window.location = '/'
})
