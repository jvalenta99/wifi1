class ServerObj {

    constructor() {

        this.express = require('express');
        this.app = this.express();
        this.fs = require('fs');
        this.bp = require('body-parser');
        this.url = require('url');
        this.fileName = 'quiz.txt';
        this.app.listen( 8080, 'localhost' );
        this.app.use( this.express.static('inc') );
        this.app.use( this.bp.urlencoded({extended:true}));
    }

    get app() {
        return this._app;
    }

    set app( app ) {
        this._app = app;
    }

    get fs() {
        return this._fs;
    }

    set fs( fs ) {
        this._fs = fs;
    }

    get url() {
        return this._url;
    }

    set url( url ) {
        this._url = url;
    }

    get fileName() {
        return this._fileName;
    }

    set fileName( fileName ) {
        this. _fileName = fileName;
    }
}

module.exports = ServerObj;