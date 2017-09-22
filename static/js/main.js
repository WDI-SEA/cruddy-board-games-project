console.log("JS good to go, sir!");

// listen for a "submit" event for the edit page. the edit form will live
// at the path GET /games/:name/edit. Use AJAX to send a PUT request to the
// appropriate URL

$('put-form').on('submit',function(e) {
	e.preventDefault();
	var element=$(this);
	var url=element.attr('action');
	var formData = element.serialize();
	$.ajax({
		mehtod: 'PU'
		url: url,
		data: formData
	}). done(function)(data) {

		window.location = url;
	});
});

// listen for clicks on "delete" links. use AJAX to send a DELETE HTTP request
// to the appropriate URL

$('.delete-link').on('click', function(e) {
	e.preventDefault();
	var element = $(this);
	var url = element.attr('href')
	$.ajax({
		method: 'DELETE',
		url: uel
	}).done(function(data) {
		window.location = '/';
	});
});

