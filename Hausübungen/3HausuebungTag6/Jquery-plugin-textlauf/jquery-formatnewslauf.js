;(function($) {
  var stop=0;
  $.fn.formatnews = function( options ) {
    var textnews = '', breite=50, speed=100, duration;
    var settings = $.extend({
    //  <<<SETTINGNAME>>>:<<<STANDARDVALUE>>>
    },options);
    $('<div>')
      .addClass( 'newsticker')
      .css({
        'background-color':'#86592d',
        'white-space':'no-wrap',
      	overflow:'hidden',
        padding: '10px',
        'border-radius':'10px',
        'box-shadow': '2px 2px 10px grey',
        'text-shadow': '2px 2px 4px #000000'
      })
      .prependTo( 'body' );

    $('<div>')
      .html(textnews)
      .css({
        'white-space':'nowrap',
        'font-family':'Arial,Helvetica,sans-serif',
        display:'inline',
        color: 'white',
        width:'auto',
        'font-weight': 'bold'
      })
      .prependTo('.newsticker');

      $( document ).on( 'mouseover', '.newsticker', function() {
        //stop=1;
        console.log('mouseover');
        stop=1;
      })

      $( document ).on( 'mouseleave', '.newsticker', function() {
        //stop=1;
        console.log('mouseleave');
        stop=0;
      })

      console.log("plugin before return");

   this.each( function() {
      var position;
      console.log("plugin ausgeführt in der schleife!");

      $(this).hide();
      textnews +=$(this).html();
      textnews +='&nbsp;&nbsp;&nbsp;&nbsp;';
      $('.newsticker>div').html(textnews);

    }); //each schleife

    position=$(window).width();
    var move =function  (){
      $('div.newsticker').css({'text-indent': +position+'px'});
      position--;
      if(position<-1*$('div.newsticker>div').width()) {
        position=$(window).width();
      }
      if(stop==1){position++;}
      setTimeout( move,10);
    } //move function
    move();
    $('div.newsticker').css({'text-indent': +position+'px'});
    return this;
  };
}(jQuery));
