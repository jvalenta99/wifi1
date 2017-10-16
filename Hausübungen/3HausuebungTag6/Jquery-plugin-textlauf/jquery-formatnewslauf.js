;(function($) {
  $.fn.formatnews = function( options ) {
    var textnews = '', breite=50, speed=100, duration;
    var settings = $.extend({
    //  <<<SETTINGNAME>>>:<<<STANDARDVALUE>>>
    },options);
    $('<div>')
      .addClass( 'newsticker')
      .css({
        'white-space':'no-wrap',
      	overflow:'hidden',
      	'text-indent': '0px'
      })
      .prependTo( 'body' );

    $('<div>')
      .html(textnews)
      .css({
        'white-space':'nowrap',
        display:'inline',
        color: 'red',
        width:'auto'
      })
      .prependTo('.newsticker');

      console.log("plugin before return");
    //return

    this.each( function() {

      console.log("plugin ausgeführt in der schleife!");

      $(this).hide();
      textnews +=$(this).html();
      textnews +='&nbsp;&nbsp;&nbsp;&nbsp;';
      $('.newsticker>div').html(textnews);

    }); //each schleife
    var position=$(window).width();
    console.log('width div s textem: '+$('div.newsticker>div').width())
    console.log('width newsticker: '+$('div.newsticker').width());
    console.log('window width : '+$(window).width());

    var move =function  (){
      $('div.newsticker').css({'text-indent': +position+'px'});
      position--;
      if(position<-1*$('div.newsticker>div').width()) {
        position=$(window).width();

      }
      setTimeout( move,10);

    } //move function
    move();

    console.log("ahoj"+position);
    $('div.newsticker').css({'text-indent': +position+'px'});
    return this;
  };
}(jQuery));
