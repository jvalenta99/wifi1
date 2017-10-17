;(function($) {
  var stop=0;
  $.fn.formatnews = function( options ) {
    var textnews = '', breite=50, speed=100, duration;
    var settings = $.extend({
      speed:'10',
      width: 'auto',
      runcounter: 'endless'
    },options);
    $('<div>')
      .addClass( 'newsticker')
      .css({
        'background-color':'#86592d',
        'white-space':'no-wrap',
      	overflow:'hidden',
        padding: '10px 0px',
        'border-radius':'10px',
        'box-shadow': '2px 2px 10px grey',
        'text-shadow': '2px 2px 4px #000000',
        'margin':'auto',
        'width':settings.width
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
    var windowwidth=$(window).innerWidth()*1;
    console.log('window width: ' + windowwidth);

    var stickerwidth=$('div.newsticker').width()*1;
    console.log('stickerwidth: ' + stickerwidth);

    var textlength=$('div.newsticker>div').outerWidth()*1;
    console.log('textlength: ' + textlength);

    position=windowwidth/2+stickerwidth/2;
    console.log('position: ' + position);

    console.log('sticker width in px: ' + $('div.newsticker')[0].clientWidth);
    var counter=0;
    var move =function  (){
      $('div.newsticker').css({'text-indent': +position+'px'});
      //console.log('position in der schleife: '+ position);
      position--;
      if(position<windowwidth/2-stickerwidth/2-textlength) {
        console.log(position);
        position=windowwidth/2+stickerwidth/2;
        console.log(position);
        counter++;
      }
      if(stop==1){position++;}
      console.log('importierte counter:'+ settings.runcounter);
      if (counter<settings.runcounter*1){
        setTimeout( move,settings.speed);
        console.log('runs: '+ counter);
      }

    } //move function
    move();
    console.log('fertig: '+ counter);
    $('div.newsticker').css({'text-indent': +position+'px'});
    return this;
  };
}(jQuery));
