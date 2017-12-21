var x = 0;
$( document ).ready(function() {
  $.ajax({
    //url:'http://localhost:26893/getsomething',
    url:'http://localhost:26893/getsomething',
    method:'get',
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
});
