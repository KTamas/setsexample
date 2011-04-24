var getwords = function() {
  var words = [];
  $('input').each(function(c, item) {
    var value = $(item).val();
    if (value != '') {
      words.push(value);
    }
  });
  return words;
}

$(document).ready(function(){
  $('input').bind('blur', function(event) {
    if (getwords().length < 3) {
      return;
    }

    if (getwords().length == 16) {
      return; // don't re-request
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
        $('input').each(function(c, item) {
          $(item).val(body[c]);
        });
      },
      error: function() { alert("oops"); },
      complete: function() {
        $('div.loader').hide();
      }
    });

    $('div.loader').hide();
  });
});
