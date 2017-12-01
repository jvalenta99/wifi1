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
var bp = require( 'body-parser');

var server = app.listen( 54321, function(){
  console.log( 'Server läuft 54321.');
})

app.use( bp.urlencoded ( { extended:true } ) );

app.use( express.static( 'inc'));

app.get( '/', function(req,res){
  fs.readFile('index.html', function(err, data){
    if( !err ) {
      res.writeHead(200, {'Content-Type':'text/html'});
      res.end( data );
    }
  })

})

app.get( '/getsomething', function(req, res) {
  fs.readFile('klicks.json', function(err, data){
    res.end(JSON.stringify(JSON.parse(data)));
  })

})

app.post( '/getprojects', function( req, res) {
  console.log( req.body. );
  //fs.writeFile( 'projekte.json', JSON.stringify( { klicks: req.body}), function() {
  fs.writeFile( 'projekte.json', JSON.stringify( req.body), function() {
    console.log( 'projekte.json gespeichert.' );
    res.end( req.body.rootObject);
  });
});


/*
app.post( '/getsomething', function(req, res) {

  console.log(req.body.anzahlKlicks);
  fs.writeFile('klicks.json',JSON.stringify({klicks: req.body.anzahlKlicks}), function() {
    console.log( ' klicks.json gespeichert.' );
    res.end( req.body.anzahlKlicks );
  });
})
*/
