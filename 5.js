'strict mode';
var fs = require('fs');
var f = '';
f  = fs.readFileSync('input', 'utf8');
var ff = f.split("\n");


//ff = ["qjhvhtzxzqqjkmpb", "xxyxx", "uurcxstgmygtbstg", "ieodomkazucvgmuy", "aabcdefgaa"];
//ff = ["xyxy"];

function three_v(s){
  var counter = 0;
  for(var i = 0; i < s.length; i++){
    if( /[aeiou]/.test( s.charAt(i) ) ){
      counter++;
    }
  }
  return (counter > 2);

}

function twice2(s){
  for(var c = 0 ; c < s.length - 3; c++){
    var sub = s.substring(c, c+2);
    if(s.substring(c+2, s.length).indexOf(sub) !== -1){
      return true;
    }
  }
}

function twice(s){
  for(var c = 0 ; c < s.length ; c++){
    if( c <= s.length -2 && s.charAt(c) === s.charAt(c+1)  ){
      return true;
    }
  }
  return false;
}
function trice(s){
  for(var c = 0 ; c < s.length ; c++){
    if( c <= s.length -3 && s.charAt(c) === s.charAt(c+1) && s.charAt(c) === s.charAt(c+2)  ){
      return true;
    }
  }
  return false;
}


function repeat(s){
  for(var c = 0 ; c < s.length; c++){
    if( c+2 === s.length)
      return false;
    if( (s.charAt(c) === s.charAt(c+2)) ){
      return true;
    }
  }
  return false;
}

function white(s){
  var a = /.*ab.*/.test(s);
  if(a){
    console.log(s + "Fails for ab");
  }
  var b = /.*cd.*/.test(s);
  if(b){
    console.log(s + "Fails for cd");
  }
  var c = /.*pq.*/.test(s);
  if(c){
    console.log(s + "Fails for pq");
  }
  var d = /.*xy.*/.test(s);
  if(d){
    console.log(s + "Fails for xy");
  }
  return !( a ||  b || c || d  );
}

function is_nice(s){
  var a = repeat(s);
  if(!a){
    console.log(s +" is not nice because of repeat");
  }
  var b = twice2(s);
  if(!b){
    console.log(s +" is not nice because of twice2");
  }

  return a && b ;
}

var counter = 0;
for ( var s in ff){
  if (is_nice(ff[s]) ){
    console.log(ff[s] + " is nice");
    counter++;
  }
}

console.log(counter);
