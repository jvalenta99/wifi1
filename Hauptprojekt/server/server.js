
var express = require( 'express' );
var app = express();
var fs = require( 'fs' );
var bp = require( 'body-parser' );
var projetsArr=[];
var root ={
  projects:projetsArr
};

var server = app.listen( 26893, function() {
  console.log( 'Server läuft auf Port 26893.' );
});

app.use( function(req, res, next) {
  res.setHeader( 'Access-Control-Allow-Origin', '*' );
  res.setHeader( 'Access-Control-Allow-Methods', 'GET, POST' );
  next();
});

app.use( bp.urlencoded( {extended:true} ) ); // POST Daten geparst
//app.use( bp.json({ type: 'application/*+json' }));
app.use( express.static( 'inc' ) );

//test connection html
app.get( '/', function( req, res) {
  fs.readFile( 'index.html', function(err, data) {
    if ( !err ) {
      res.writeHead(200,{'Content-Type':'text/html'});
      console.log("index.html abgefragt");
      res.end( data );
    }
  });
});

app.post( '/projects', function( req, res) {
  console.log( req.body.dataObject );
  //fs.writeFile( 'projekte.json', JSON.stringify( { klicks: req.body}), function() {
  fs.writeFile( 'allprojects.json', req.body.dataObject, function() {
    console.log( 'allprojects.json gespeichert.' );
      res.end( req.body.dataObject);
  });
});

app.post('/readprojects', function(req, res){
  console.log("reading projects");

    fs.readFile( 'allprojects.json', function(err, data) {
      console.log(data);
      res.end(JSON.stringify(JSON.parse(data)) ) ;
    });
});

console.log("test11");
var startProjectsArr = function (){
  fs.writeFile( 'allprojects.json',JSON.stringify(root),function(){
    console.log("file initialized L57");
  })
}
// startProjectsArr();

var getProjectsDataFromFile = function(){
  fs.readFile( 'allprojects.json', function(err, data) {
    console.log(data);
    root = JSON.parse(data);
    console.log(root);
    console.log(root.projects[1]);
  });
}

getProjectsDataFromFile();
