'strict mode';
var fs = require('fs');
var md5 = require('md5');
var f = '';
var my_key = "ckczppom";

var c = 0;
while(true){
  var hash = md5(my_key + c);

  if( /^0{6}.*$/.test(hash) ) {
    console.log(c);
    break;
  }
  c++;
}
