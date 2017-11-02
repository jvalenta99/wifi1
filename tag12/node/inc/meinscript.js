var x = 0;
$( document).on( 'click', 'button', function(e){
  x++;
  $.ajax({
    url:'http://localhost:54321/getsomthing',
    method:'post',
    data:{anzahlclicks:x},
    success:function( data ){
      $('button').html(data);
    }
  })
})
