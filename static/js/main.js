$('.put-form').on('submit', function(e) {
    e.preventDefault();
    var element = $(this);
    var url = element.attr('action');
    var formData = element.serialize();
    $.ajax({
        method: 'PUT',
        url: url,
        data: formData
    }).done(function(data) {
      console.log(data);
        window.location = url;
    });
});

$('.delete-link').on('click', function(e) {
    e.preventDefault();
    var element = $(this);
    var url = element.attr('href');
    $.ajax({
        method: 'DELETE',
        url: url
    }).done(function(data) {
      console.log(data);
        window.location = '/';
    });
});
