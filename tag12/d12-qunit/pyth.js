var pyth= function (){
  var o={};
  for (var i = 0; i < 1000; i++) {
    for (var j = 0; j < 1000; j++) {
      k=1000-i-j;
      if (j*j+i*i==k*k) {
        //console.log(j + ','+k+','+l);
        o.a=i;
        o.b=j;
        o.c=k;
        return o;
      }
    }
  } //for
}//pyth
