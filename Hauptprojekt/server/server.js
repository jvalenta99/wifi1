
var express = require( 'express' );
var app = express();
var fs = require( 'fs' );
var bp = require( 'body-parser' );
var projetsArr=[];
var root ={
  projects:projetsArr
};
root.projects.push("1");
root.projects.push("2");

var rootFromFile;


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

//add new project to projects
app.post( '/newProjectND', function( req, res) {
  console.log( req.body.dataObject );
  //get data from file to root object, add new project and save to file
  //var root2 = getProjectsDataFromFile (  );
  console.log("opened file:");
  console.log(root2);
  //root.projects.push(root);

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

//test connection html with html
app.get( '/', function( req, res) {
  fs.readFile( 'index.html', function(err, data) {
    if ( !err ) {
      res.writeHead(200,{'Content-Type':'text/html'});
      console.log("index.html abgefragt");
      res.end( data );
    }
  });
});


//test write to allprojects
var saveToFile = function (){
  fs.writeFile( "allprojects.json",JSON.stringify(root),function(){
    console.log("Projects saved to file");
    getProjectsDataFromFile();

  })
}
//saveToFile();

//test reading file
var getProjectsDataFromFile = function(){
  fs.readFile( "allprojects.json", function(err, data) {
    console.log("reading data");
    root = JSON.parse(data);

    console.log(root);
    console.log(root.projects[1]);
    return root;
  });
};


fs.writeFile( "allprojects.json",JSON.stringify(root),function(){
  console.log("Projects saved to file");
  console.log("show file data");
  console.log( getProjectsDataFromFile() );
})
