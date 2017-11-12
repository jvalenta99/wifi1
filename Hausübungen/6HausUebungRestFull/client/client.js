var x = 0;
$( document ).ready(function() {
  $.ajax({
    //url:'http://localhost:26893/getsomething',
    url:'http://192.168.0.23:26893/getsomething',
    method:'get',
    dataType: "json",
    success:function( data ){
      console.log("get function läuft");
      //data = JSON.parse(data);
      x = data.klicks;
      $( 'button' ).html( x );
    }
  });
});


$( document ).on( 'click', 'button', function(e) {
  x++;
  console.log("clicked button in client.js");
  $.ajax({
    url:'http://localhost:26893/getsomething',
    method:'post',
    data:{anzahlklicks:x},
    success:function( data2 ) {
      $( 'button' ).html( data2 );
    }
  });

//export test array with object in it getarrayobjects


$( document ).ready(function() {
  $.ajax({
    //url:'http://localhost:26893/getsomething',
    url:'http://localhost:26893/getarrayobjects',
    method:'get',
    //dataType: 'json',
    success:function( data ){
      console.log(data);
      var unparsed = JSON.parse(data);
      console.log(unparsed[0]);
      console.log(unparsed[1]);


      //data = JSON.parse(data);
      /*
      x = data.klicks;
      $( 'button' ).html( x );
      */
    }
  });
});

//-------------------------------------------------------

});
