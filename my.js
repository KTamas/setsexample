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
    if (getwords().length != 3) { //only if it's three, we'll have a manual one in the future
      return;
    }

    $.ajax({ 
      beforeSend: function() {
        $('div.loader').show();
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
