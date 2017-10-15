;(function($) {
  $.fn.formatnews = function( options ) {
    var settings = $.extend({
    //  <<<SETTINGNAME>>>:<<<STANDARDVALUE>>>
    },options);
    return this.each( function() {
        //<<<CODE>>>
        console.log("plugin ausgeführt!");
        $( '<p>' )
      		.html( 'alles neu' )
      		.addClass( 'arial')
      		.prependTo( 'body' );


    });
  };
}(jQuery));
