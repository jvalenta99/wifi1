
var express = require( 'express' );
var app = express();
var fs = require( 'fs' );
var bp = require( 'body-parser' );
//var projectsArr=[];

/*
var root ={ projects:projectsArr }; //temp allprojects object in memory
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
    res.json({projectcreated: 'yes'});
    res.end();
    //console.log("root object after insert: ", root);


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
      var projectsArr=[];
      var out={ projects:projectsArr };

      root = JSON.parse(data);
        //console.log("dataparsed: ",JSON.parse(data));

      for(var i=0; i<root.projects.length; i++) {
        out.projects[i]={id:i,name:root.projects[i].name,description:root.projects[i].description}
        if(root.projects[i].name){

        }//out.projects[0]={id:7};
        //out.projects[i].name=root.projects[i].name;
        //out.projects[i].description=root.projects[i].description;
      }
      //console.log("outobject: ", out);

      //res.json({out: JSON.stringify(out)});
      res.send( JSON.stringify(out) );
      res.end();
    }); //read file


});


//----------------------------get one project (with id parameter)---------------------------
app.get('/projectsND/:id', function( req, res){
  var id = req.params.id;
  fs.readFile( 'allprojects.json', function(err, data) {
      //create object with id, name detail and put to response
      var root={};
      var out={};

      root = JSON.parse(data);
      //console.log("dataparsed: ",JSON.parse(data));

        //if(root.projects[id].name){
        out=root.projects[id];
        //}//out.projects[0]={id:7};
        //out.projects[i].name=root.projects[i].name;
        //out.projects[i].description=root.projects[i].description;

      //console.log("outobject: ", out);

      //res.json({out: JSON.stringify(out)});
      res.send( JSON.stringify(out) );
      res.end();
    }); //read file
});





//----------------------------update (overvrite) one project (with id parameter)---------------------------

app.put('/projectsND/:id', function(req, res) {
    console.log("update activated");
    var id = req.params.id;
    console.log("id to update: " + id);
    var receivedProject = JSON.parse(req.body.dataObject);

    fs.readFile( "allprojects.json", function(err, data) {
      var root={};
      root = JSON.parse(data);
      console.log("id before update change", id);
      root.projects[id]=JSON.parse(JSON.stringify(receivedProject))
      //console.log("root object after insert: ", root);


      //persist allprojects in root from to json file
      fs.writeFile( "allprojects.json",JSON.stringify(root),function(){
        res.json({updated: root});
        res.end();
        console.log("Project updated");
      }); //write file
    }); //readFile
    //res.send('Successfully deleted product!');
});


//----------------------------delete one project (with id parameter)---------------------------
app.delete('/projectsND/:id', function(req, res) {
    console.log("delete activated");
    var id = req.params.id;
    console.log("id to delete: " + id);


    fs.readFile( "allprojects.json", function(err, data) {
      var root={};
      root = JSON.parse(data);
      root.projects.splice(id,1);
      //console.log("root object after insert: ", root);


      //persist allprojects in root from to json file
      fs.writeFile( "allprojects.json",JSON.stringify(root),function(){
        res.json({deleted: 'yes'});
        res.end();
        console.log("Project deleted");
      }); //write file
    }); //readFile
    //res.send('Successfully deleted product!');
});

//----------------------------delete one connection (with id parameter)---------------------------
app.post('/projectsND/:id', function(req, res) {
    console.log("delete of connection activated");
    var projectID = req.params.id; //connection id
    var connectionID =JSON.parse(req.body.conID);
    console.log( "received projectID: ", projectID );
    console.log("connection id to delete: " + connectionID);


    fs.readFile( "allprojects.json", function(err, data) {
      var root={};
      root = JSON.parse(data);
      console.log( "received projectID: ", projectID );
      console.log("connectionID bevore splice: ",connectionID );
      root.projects[projectID].connections.splice(connectionID,1);
      //console.log("root object after insert: ", root);


      //persist allprojects in root from to json file
      fs.writeFile( "allprojects.json",JSON.stringify(root),function(){
        res.json({connectionDeleted: connectionID});
        res.end();
        console.log("Project deleted",connectionID);
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
    var projectsArr=[];
    var out={ projects:projectsArr };

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
