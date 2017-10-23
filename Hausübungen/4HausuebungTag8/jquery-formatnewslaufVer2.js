;(function($) {
  var stop=0;
  $.fn.formatnews = function( options ) {
    var textnews = '', breite=50, speed=0, duration;
    var settings = $.extend({
      speed:'15',
      width: 'auto',
      runcounter: 'endless'
    },options);
    $('<div>')
      .addClass( 'newsticker')
      .css({
        'background-color':'#cc9966',
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
        stop=1;
      })

      $( document ).on( 'mouseleave', '.newsticker', function() {

        stop=0;
      })

   this.each( function() {
      var position;
          textnews +=$(this).text();
      textnews +='&nbsp;&nbsp;&nbsp;&nbsp;';
      $('.newsticker>div').html(textnews);
    }); //each schleife
    var windowwidth=$(window).innerWidth()*1;
    //console.log('window width: ' + windowwidth);
    var stickerwidth=$('div.newsticker').width()*1;
    //console.log('stickerwidth: ' + stickerwidth);
    var textlength=$('div.newsticker>div').outerWidth()*1;
    //console.log('textlength: ' + textlength);
    position=windowwidth/2+stickerwidth/2;
    var counter=0;
    var move =function  (){
      $('div.newsticker').css({'text-indent': +position+'px'});
      //console.log('position in der schleife: '+ position);
      position--;
      if(position<windowwidth/2-stickerwidth/2-textlength) {
        //console.log(position);
        position=windowwidth/2+stickerwidth/2;
        //console.log(position);
        counter++;
      }
      if(stop==1){position++;}
      if (counter>=settings.runcounter*1){
        clearInterval(runmove);
      }
    }
    var runmove;
    runmove=setInterval( move,settings.speed);
    return this;
  };
}(jQuery));
