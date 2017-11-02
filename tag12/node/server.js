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

var express = require( 'express');
var app = express();

var server = app.listen( 54321, function(){
  console.log( 'Server läuft.');


})
