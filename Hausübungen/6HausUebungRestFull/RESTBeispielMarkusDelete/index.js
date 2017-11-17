'use strict';

let ServerObjekt = require('./ServerObj');
let server = new ServerObjekt();
console.log('Server läuft');

server.app.get('/', function( req, res ) {
    
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    server.fs.readFile('index.html', function( err, data ) {
        
        if( err ) {
            throw err;
        }
        else {
            res.end( data );
        }
    });
});
 
server.app.get('/quizfragen', function( req, res ) {
    
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    server.fs.stat(server.fileName, function( err, stats){
        
        if( err ) {
            throw err;
        }
        else {
            
            let fileSize = stats.size;

            if(fileSize === 0) {
                res.end('keine Daten');
            }
            else {
                
                server.fs.readFile(server.fileName, function( err, data ) {
                
                    if( err ) {
                        throw err;
                    }
                    else {
                        res.end(data.toString());
                    }
                });
            }
        }
    })
});
    
server.app.get('/quizfragen/:id', function( req, res ) {

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    let daten = [];
    let found = false;
    
    server.fs.readFile(server.fileName, function( err, content ) {
    
        let c = content.toString().split("\n");
        let dataID = '';
    
        for(let i = 0; i < c.length; i++) {
                        
            let temp = c[i].split(";");
    
            for(let j = 0; j < temp.length; j++) {
                            
                let t = temp[j].split(":");
    
                if(j === 0) {
    
                    if( t[1] === req.params.id ) {
                                
                        found = true;
                        daten.push(t[1]);
                        daten.push(temp[j+1].split(":")[1]);
                        daten.push(temp[j+2].split(":")[1].split(","));
                    }
    
                }
                else {
                    continue;
                }
            }
        }

        if( found ) {
                        
            let html  = '<!DOCTYPE html>\n' +
                        '<html lang="de">\n' + 
                        '<head>\n' +
                        '<meta charset="UTF-8">\n' +
                        '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
                        '<meta http-equiv="X-UA-Compatible" content="ie=edge">\n' +
                        '<title>Quizfrage bearbeiten</title>\n' +
                        '<link rel="stylesheet" href="style.css">\n' +
                        '</head>\n' +
                        '<body>\n' +
                        '<div class="wrapper">\n' +
                        '<nav class="main-nav">\n' +
                        '<h2>Quizfragen-Verwaltung <a href="/create">Quizfrage erstellen</a></h2>\n' +
                        '</nav>\n' +
                        '<main>\n' +
                        '<form id="updateForm">\n' +
                        '<label for="frage">Quizfrage:</label>\n' +
                        '<input type="text" data-kennung="' + daten[0] + '" id="frage" name="frage" value="' + daten[1] + '" required>\n' +
                        '<label for="antwort1">Antwort 1:</label>\n' +
                        '<input type="text" id="antwort1" name="antwort1" value="' + daten[2][0] + '" required>\n' +
                        '<label for="antwort2">Antwort 2:</label>\n' +
                        '<input type="text" id="antwort2" name="antwort2" value="' + daten[2][1] + '" required>\n' +
                        '<label for="antwort3">Antwort 3:</label>\n' +
                        '<input type="text" id="antwort3" name="antwort3" value="' + daten[2][2] + '" required>\n' +
                        '<label for="antwort4">Antwort 4:</label>\n' +
                        '<input type="text" id="antwort4" name="antwort4" value="' + daten[2][3] + '" required>\n' +
                        '<input type="submit" value="Datensatz bearbeiten">\n' +
                        '<div id="output"></div>\n' +
                        '</form>\n' +
                        '</main>\n' +
                        '</div>\n' +
                        '<script src="jquery-3.2.1.min.js"></script>\n' +
                        '<script src="update.js"></script>\n' +
                        '</body>\n' +
                        '</html>\n';
                
            server.fs.writeFile('./inc/update.html', `${html}`, function( err, data ) {
                            
                if( err ) {
                    throw err;
                }
                else {
                    res.end('update.html');
                }
            });
        }
        else {            
            res.end('Datensatz mit ID ' + req.params.id + ' konnte nicht gefunden werden!');
        }
    });
});

server.app.put('/quizfragen/:id', function( req, res ) {

    if(req.headers.referer === 'http://localhost:8080/update.html') {
        
        server.fs.readFile(server.fileName, function( err, data ){
                        
            if( err ) {
                throw err;
            }
            else {
                            
                let content = data.toString().split("\n");
                let tempString = server.url.parse(req.url, true);
                        
                for(let k = 0; k < content.length; k++) {
                        
                    let t = content[k].split(";");
    
                    if(t[0].split(":")[1] === req.params.id) {
                        let s = 'id:' + req.params.id  + ';';
                        s += 'frage:' + tempString.query.frage + ';';
                        s += 'antworten:' + tempString.query.antworten;
                        content[k] = '';
                        content[k] = s;
                    }
                }
    
                let newContent = content.join("\n");
              
                server.fs.writeFile(server.fileName, `${newContent}`, function( err, data ){
                        
                    if( err ) {
                        throw err;
                    }
                    else {
                        res.end('Datensatz wurde erfolgreich aktualisiert!');
                    }
                });
            }
        });
    }
})

server.app.get('/create', function( req, res ) {

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    server.fs.readFile('create.html', function( err, data ) {
        
        if( err ) {
            throw err;
        }
        else {
            res.end( data );
        }
    });
});

server.app.post('/neuequizfrage', function( req, res ) {

    let id = 1;

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    server.fs.stat(server.fileName, function( err, stats ) {

        if( err ) {
            throw err;
        }
        else {
    
            let fileSize = stats.size;

            if(fileSize === 0) {
                    
                server.fs.appendFile(server.fileName, `id:${id};frage:${req.body.frage};antworten:${req.body.antworten}${'\n'}`, function( err, data ) {
                    
                    if( err ) {
                        throw err;
                    }
                    else {
                        res.end('Datensatz wurde gespeichert!');
                    }    
                });
            }
            else {

                server.fs.readFile(server.fileName, function( err, data ) {

                    let content = data.toString().split("\n");
                    id = (content[content.length - 2].split(";")[0].split(":")[1] * 1) + 1;
                        
                    server.fs.appendFile(server.fileName, `id:${id};frage:${req.body.frage};antworten:${req.body.antworten}${'\n'}`, function( err, data ) {
                        
                            if( err ) {
                                throw err;
                            }
                            else {
                                res.end('Datensatz wurde gespeichert!');
                            }
                    });
                });              
            }
        }
    });
});

server.app.delete('/quizfragen/:id', function( req, res ){

    server.fs.readFile(server.fileName, function( err, data){

        let content = data.toString().split("\n");
        let found = false;

        for(let i = 0; i < content.length; i++) {

            let temp = content[i].split(";");

            if(temp[0].split(":")[1] === req.params.id) {
                found = true;
                content.splice(i,1);
            }
        }

        let c = content.join("\n");

        if( found ) {

            server.fs.writeFile(server.fileName, `${c}`, function( err, data ){

                if(err) {
                    throw err;
                }
                else {
                    res.end('Datensatz wurde erfolgreich gelöscht!')
                }
            });
        }
        else {
            res.end('Datensatz wurde nicht gefunden!');
        }
    });
});