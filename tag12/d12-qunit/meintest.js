QUnit.test( 'mein erster Test', function(assert){
  assert.ok( 1=='1', 'automatische Typumwandlung' );

});

QUnit.test( 'Zahlen addieren', function(assert){

  assert.ok( typeof add == 'function', 'add() existiert');
  assert.equal( add(1,2), 3, 'addieren von Zahlen');
  assert.equal( add('1','2'), 3, 'Addieren mit Typumwandlung');
  assert.equal( add('a','b'), 'ab', 'Bei nicht nummerischen Werten verketten');
  assert.equal( add('1,5',1.2), 2.7, 'Addieren Kommazahlen . oder , ')
});

QUnit.test( 'Objekte', function(assert){
  //assert.equal( create(1,2), {})
  assert.deepEqual( create(1,2), {a:1,b:2}, 'Zahlenobjekt');
  assert.deepEqual( create(1,2,3), {a:1,b:2,c:3}, 'Zahlenobjekt');
    assert.deepEqual( create(2,3,1), {a:1,b:2,c:3}, 'Zahlenobjekt sortiert');
    assert.throws( create(), /Error/, 'keine Werte' );
    assert.throws( create('a'), /Error/, 'nichtnummerische Werte')
});



var outputSum =function(x,y) {
  document.getElementById('ausgabe').innerHTML = add(x,y);
}
