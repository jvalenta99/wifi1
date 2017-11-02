var add = function(a,b){
  if(typeof a == 'string')
a= a.replace( ',' , '.');
if(typeof b == 'string')
b= b.replace( ',' , '.');

if (isFinite(a)) a *=1; //test nummer oder text als nummer
if (isFinite(b)) b *=1;
  return a+b;
}

var create = function() {
  var werte = arguments.sort();
  var o = {};
  //var indexe = 'abcde';
  arguments = Array.prototype.sort.call( arguments );
    for (var i arguments){
      o[ indexe[i] ] = arguments[i];
      o[String.fromCharCode( i*1+97)] = arguments[i];
    }

    return o
  } //create

  var outputSum =function(x,y) {
    document.getElementById('ausgabe').innerHTML = add(x,y);
  }
