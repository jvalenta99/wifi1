
;(function() {
  "use strict";
  $( document ).ready( function() {
    var lastposX=0;
    var lastposY=0;
    var currentColor = 'red';
    var malen = false
    var ctx = $( 'canvas' ).get(0).getContext( '2d' );

    var positions = [];

    $('button').on("click",function(){
      currentColor=$(this).text();
    })

    $('canvas').on('mousedown',function(event){
      malen=true;

    });

    $('canvas').on('mouseup',function(event){
      malen=false;

    });


    $('canvas').on('mousemove',function(event){
      if (malen) {
      var relPosX = event.pageX - $(this).offset().left;
      var relPosY = event.pageY - $(this).offset().top;

      ctx.beginPath();
  		ctx.arc( relPosX,relPosY,5,0,2*Math.PI );
      ctx.fillStyle = currentColor;
      ctx.lineWidth = 0;
      ctx.fill();

    }
  		//ctx.stroke();
    })
/*
    ctx.beginPath();
		ctx.arc( 150,150,5,0,2*Math.PI );
    ctx.fill();
		ctx.stroke();
*/
    $('#save').on('click',function(){
      myFileHandler.createNewFileFromCanvas($('canvas').get(0) );
    });
  }) //document ready
}());
