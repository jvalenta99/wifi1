;(function($) {
  $.fn.formatnews = function( options ) {
    var textnews = '', breite=50, speed=100, duration;
    var settings = $.extend({
    //  <<<SETTINGNAME>>>:<<<STANDARDVALUE>>>
    },options);
    $('<p>')
      .html(textnews)
      .addClass( 'newsticker')
      .prependTo( 'body' );
      /*
      $('<span>')
        .prependTo('.newsticker');*/
/*
      {
        color: 'red';
        position: 'relative';
        white-space: 'nowrap';
        overflow: 'hidden';
        animation-name: 'laufe';
        animation-duration: '5s';
        animation-iteration-count: 'infinite';
        animation-timing-function: 'linear'
        }
*/
      $('<p>')
        .html("breite in px: " + breite)
        .addClass( 'elementbreite')
        .appendTo( 'body' );
    console.log("plugin before return");
    return this.each( function() {

      console.log("plugin ausgeführt in der schleife!");
      console.log('window width: '+ $(window).width());

      //  $(this).hide();
      textnews +=$(this).html();
      textnews +='&nbsp;&nbsp;&nbsp;&nbsp;';
      $('.newsticker').html(textnews);
        console.log('newsticker-länge: ' + breite);
      breite = Math.round( $( '.newsticker' )[0].getBoundingClientRect().width );
      $('.elementbreite').html(breite);

      duration = Math.round ( breite / speed );
      //$('.newsticker').css({"'animation-duration': '" + duration + "s'"});
      $('.newsticker').css({'animation-duration': '7s'});



      console.log(duration);
    }); //each schleife

  };
}(jQuery));
