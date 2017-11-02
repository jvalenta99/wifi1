/*var x = require('./testmodule');

var sum = x.testFunc(1,2);

console.log( 'die summe ist: '+ sum);
*/

/* Standard HTTP-Modul
var http = require( 'http' );
http.createServer( function(req, res ){

  res.write( 'Hallo Welt!');
  res.end();

}).listen(54321);
*/

//...
var express = require( 'express');
var app = express();
var fs = require( 'fs');

var server = app.listen( 54321, function(){
  console.log( 'Server läuft 54321.');
})

app.use( express.static( 'inc'));

app.get( '/', function(req,res){
  fs.readFile('index.html', function(err, data){
    if( !err ) {
      res.writeHead(200, {'Content-Type':'text/html'});
      res.end( data );
    }
  })
})

app.pst( '/getsomething', function(req, res) {
  res.end( 'Klick mich besser');
})
