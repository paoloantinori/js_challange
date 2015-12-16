'strict mode';
var fs = require('fs');
var f = '';
f  = fs.readFileSync('input', 'utf8');
var ff = f.split("\n");

//ff = ['[1,"red",5]'];
//ff = ["abz"];
//ff = ["toggle 0,0 through 0,1", "turn on 1,1 through 1,1"];//, "turn off 1,1 through 2,2", "toggle 0,0 through 2,2"];



var ee = [];


function red_in_object(s){
  for(var key in s){
    if(s[key] === "red"){
      return true;
    }
  }
  return false;s
}

function contains_directly_red(s){
  if( (typeof(s) === 'object') && !(s instanceof Array) && red_in_object(s) ){
    return true;
  }
}

function visit(s){
  console.log("visiting: " + s);
  if(typeof(s) === 'number'){
    console.log(s + " is a number");
    ee.push(s);
  } else if(s instanceof Array){
    console.log(s + " is a array of length " + s.length);
    for(var i = 0; i < s.length ; i++){
      console.log("About to visit: " + s[i]);
      visit(s[i]);
    }
  } else if(s instanceof Object){
    console.log(s + " is an object");
    var skip = false;
    for(var i in s){
      if(s[i] === "red"){
        skip = true;
      }
    }
    if(!skip){
      for(var i in s){
        visit(s[i]);
      }
    }

  } else {
    console.log("Doing nothing for " + s);
  }
}

function read(s){
    var json = JSON.parse(s);
    console.log(json);
    visit(json);

  //
  //
  //
  //
  // console.log("Input: " + s);
  // var expr = /([-0-9]+)/g;
  // var result = expr.exec(s);
  // while(result != null){
  //   if(result != null){
  //     console.log("regexp result " + result[1]);
  //     ee.push(Number(result[1]));
  //   }
  //   result = expr.exec(s);
  // }
}

function sum(s){
  var result = 0;
  s.forEach(function(e){result += e;})
  return result;
}

//populate in progress
for(var c in ff){
  if(ff[c].trim() !== ""){
    read(ff[c]);
  }
}

console.log(ee);
console.log(sum(ee));

console.log("----- read finished");



//console.log(m);
