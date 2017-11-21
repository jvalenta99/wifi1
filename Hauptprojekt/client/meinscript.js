 ;(function() {
  $.ajax({
    //url:'http://localhost:26893/getsomething',
    url:'http://localhost:26893/getprojects',
    method:'post',
    data:{"anzahlklicks":pepa},

    success:function( data ){
      console.log(data);
    }
  });


	}());
/*
  $.ajax({
    //url:'http://localhost:26893/getsomething',
    url:'http://localhost:26893/getprojects',
    method:'post',
    success:function( data ){
      data = JSON.parse(data);
      x = data.klicks;
      $( 'button' ).html( x );
    }
  });
});






$( document ).on( 'click', 'button', function(e) {
  x++;
  $.ajax({
    url:'http://localhost:26893/getsomething',
    method:'post',
    data:{anzahlklicks:x},
    success:function( data ) {
      $( 'button' ).html( data );
    }
  })
  */
//function ready
