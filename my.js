var getwords = function() {
  var words = [];
  $('input').each(function(c, item) {
    var value = $(item).val();
    if (value !== '') {
      words.push(value);
    }
  });
  return words;
}

$(document).ready(function(){
  $('input').bind('blur', function(event) {
    if (getwords().length != 3) {
      return;
    }

    $.ajax({ 
      beforeSend: function() {
        console.log(arguments);
        return $('div.loader').show();
      },
      type: 'POST',
      url: '/gimme',
      data: { words: getwords() },
      dataType: 'json',
      success: function(body) {
        var words = getwords();
        for (item in words) {
          where = body.indexOf(item);
          if ( where != -1) {
            body.splice(where, 1);
          }
        }
        $('input').each(function(c, item) {
          if ($(item).val() === '') {
            $(item).val(body[c]);
          }
        });
      },
      error: function() { alert("oops"); },
      complete: function() {
        $('div.loader').hide();
      }
    });
  });
});
