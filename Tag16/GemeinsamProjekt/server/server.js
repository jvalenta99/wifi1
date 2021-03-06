﻿/*var x = require('./testmodul');
var sum = x.testFunc(1,2);
console.log( 'Die Summe', sum );*/

/* Standard HTTP-Modul
var http = require( 'http' );
http.createServer( function( req, res ) {
  res.write( 'Hallo Welt!' );
  res.end();
}).listen(54321);
*/

var express = require( 'express' );
var app = express();
var fs = require( 'fs' );
var bp = require( 'body-parser' );

var server = app.listen( 20001, function() {
  console.log( 'Server läuft auf Port 20001.' );
});

app.use( function(req, res, next) {
  res.setHeader( 'Access-Control-Allow-Origin', '*' );
  res.setHeader( 'Access-Control-Allow-Methods', 'GET, POST' );
  next();
});

app.use( bp.urlencoded( {extended:true} ) ); // POST Daten geparst
app.use( express.static( 'inc' ) );


app.post( '/saveProjects', function( req, res) {

  //fs.writeFile( 'projekte.json', JSON.stringify( { klicks: req.body}), function() {
  //fs.writeFile( 'maps.json', JSON.stringify(JSON.parse(req.body)) , function() {
  fs.writeFile( 'maps.json', JSON.stringify(req.body.pro), function() {
    console.log( 'maps.json gespeichert.' );
    res.end( "ok" );
  });

});

app.get( '/readProjects', function( req, res) {
    fs.readFile( 'maps.json', function(err, data) {
      //res.end( JSON.stringify(JSON.parse(data)) );
      res.end( JSON.parse(data) );
    });
});



app.get( '/', function( req, res) {
  fs.readFile( 'index.html', function(err, data) {
    if ( !err ) {
      res.writeHead(200,{'Content-Type':'text/html'});
      res.end( data );
    }
  });
});

/*

app.get( '/getsomething', function( req, res) {
    fs.readFile( 'klicks.json', function(err, data) {
      res.end( JSON.stringify(JSON.parse(data)) );
    });
});

app.post( '/getsomething', function( req, res) {
  console.log( req.body.anzahlklicks );
  fs.writeFile( 'klicks.json', JSON.stringify( { klicks: req.body.anzahlklicks }), function() {
    console.log( 'klicks.json gespeichert.' );
    res.end( req.body.anzahlklicks );
  });
});


app.get('/:datanode/:id', function( req, res ) {
  res.end( req.params.datanode+' --- '+req.params.id );
} )


app.get( '/jquery-3.2.1.min.js', function( req, res) {
  fs.readFile( 'jquery-3.2.1.min.js', function(err, data) {
    if ( !err ) {
      res.writeHead(200,{'Content-Type':'text/javascript'});
      res.end( data );
    }
  });
});
*/
