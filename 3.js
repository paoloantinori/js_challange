'strict mode';
var fs = require('fs');
var f = '';
f  = fs.readFileSync('input', 'utf8');

var x = 0, y = 0, r_x = 0, r_y = 0 ;
var map = {};
map[x + "_" + y] = 2;
for (var c = 0; c < f.length; c++){
  var pos = f.charAt(c);
  switch (pos){
    case 'v':
      if( c % 2 == 0 ){
        y += 1;
      } else{
        r_y += 1;
      }
    break;
    case '>' :
    if( c % 2 == 0 ){
      x += 1;
    } else{
      r_x += 1;
    }
    break;
    case '<' :
    if( c % 2 == 0 ){
      x -= 1;
    } else{
      r_x -= 1;
    }
    break;
    case '^' :
    if( c % 2 == 0 ){
      y -= 1;
    } else{
      r_y -= 1;
    }
    break;
    default:{
      console.log("I've screwed it");
    }
  }
  var a,b;
  if( c % 2 == 0 ){
    a = x;
    b = y;
  } else{
    a = r_x;
    b = r_y;
  }
  if( map[a + "_" + b] === undefined){
    map[a + "_" + b] = 1;
  } else{
    map[a + "_" + b] += 1;
  }
}

var count = 0;
for (k in map) {
  if (map.hasOwnProperty(k)){
    count++;
  }
}

console.log(map);
console.log(count);
