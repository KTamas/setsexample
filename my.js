var getwords = function() {
  var words = [];
  jQuery('input').each(function(c, item) {
    var value = jQuery(item).val();
    if (value !== '') {
      words.push(value);
    }
  });
  return words;
}

jQuery(document).ready(function(){
  jQuery('input').bind('blur', function(event) {
    if (getwords().length != 3) {
      return;
    }

    jQuery.ajax({ 
      beforeSend: function() {
        return jQuery('div.loader').show();
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
        jQuery('input').each(function(c, item) {
          if (jQuery(item).val() === '') {
            jQuery(item).val(body[c]);
          }
        });
      },
      error: function() { alert("oops"); },
      complete: function() {
        jQuery('div.loader').hide();
      }
    });
  });
});
