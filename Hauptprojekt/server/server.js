
var express = require( 'express' );
var app = express();
var fs = require( 'fs' );
var bp = require( 'body-parser' );
//var projetsArr=[];

/*
var root ={ projects:projetsArr }; //temp allprojects object in memory
root.projects.push("1");
root.projects.push("2");
*/
var rootFromFile;


var server = app.listen( 26893, function() {
  console.log( 'Server läuft auf Port 26893.' );
});

app.use( function(req, res, next) {
  res.setHeader( 'Access-Control-Allow-Origin', '*' );
  res.setHeader( 'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE' );
  next();
});

app.use( bp.urlencoded( {extended:true} ) ); // POST Daten geparst
//app.use( bp.json({ type: 'application/*+json' }));
app.use( express.static( 'inc' ) );


//----------add new project to ProjectsND (POST without parameter)-------------
app.post( '/projectsND', function( req, res) {

  console.log( "received data: ", req.body.dataObject );
  fs.readFile( "allprojects.json", function(err, data) {
    var root={};
    root = JSON.parse(data);
    root.projects.push(JSON.parse(req.body.dataObject));
    res.end("New project has been saved.");
    console.log("root object after insert: ", root);


    //persist allprojects in root from to json file
    fs.writeFile( "allprojects.json",JSON.stringify(root),function(){
      console.log("Projects saved to file");
    }); //write file
  }); //readFile
}); //app post
//----------------------------get all projects (GET without parameter)---------------------------
app.get('/projectsND', function( req, res){

  fs.readFile( 'allprojects.json', function(err, data) {
      //create object with id, name detail and put to response
      var root={};
      var projetsArr=[];
      var out={ projects:projetsArr };

      root = JSON.parse(data);
      console.log("dataparsed: ",JSON.parse(data));

      for(var i=0; i<root.projects.length; i++) {
        if(root.projects[i].name){
        out.projects[i]={id:i,name:root.projects[i].name,description:root.projects[i].description}
        }//out.projects[0]={id:7};
        //out.projects[i].name=root.projects[i].name;
        //out.projects[i].description=root.projects[i].description;
      }
      console.log("outobject: ", out);


      res.end( JSON.stringify(out) );
    }); //read file


});

app.delete('/projectsND/:id', function(req, res) {
    console.log("delete activated")
    var id = req.params.id;
    console.log("id to delete: " + id);


    fs.readFile( "allprojects.json", function(err, data) {
      var root={};
      root = JSON.parse(data);
      root.projects.splice(id,1);
      console.log("root object after insert: ", root);


      //persist allprojects in root from to json file
      fs.writeFile( "allprojects.json",JSON.stringify(root),function(){
        res.json({deleted: 'yes'});
        res.end;
        console.log("Project deleted");
      }); //write file
    }); //readFile
    //res.send('Successfully deleted product!');
});

//test reading file

/*
var getProjectsDataFromFile = function(cb){
  fs.readFile( "allprojects.json", function(err, data) {
    console.log("reading data");
    root = JSON.parse(data);

    console.log(root);
    console.log(root.projects[1]);
    cb(root);
  });
};


fs.readFile( 'allprojects.json', function(err, data) {
    //create object with id, name detail and put to response
    var root={};
    var projetsArr=[];
    var out={ projects:projetsArr };

    root = JSON.parse(data);

    for(var i=0; i<root.projects.length; i++) {
      if(root.projects[i].id)
      out.projects[i]={id:root.projects[i].id,name:root.projects[i].name,description:root.projects[i].description}
      //out.projects[0]={id:7};
      //out.projects[i].name=root.projects[i].name;
      //out.projects[i].description=root.projects[i].description;
    }
    console.log("outobject: ", out);


    //res.end( JSON.stringify(JSON.parse(out)) );
  }); //read file












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
      console.log("read projects");
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
    getProjectsDataFromFile(function(root) {
      console.log( root );
    });

  })
}
//saveToFile();


<<<<<<< HEAD
    console.log(root);
    console.log(root.projects[1]);
    //return root;
  });
};
=======
>>>>>>> d51248b58a8cb1547a187b1f14fda39e263ca004


fs.writeFile( "allprojects.json",JSON.stringify(root),function(){
  console.log("Projects saved to file");
  console.log("show file data");
  console.log( getProjectsDataFromFile() );
})

*/
