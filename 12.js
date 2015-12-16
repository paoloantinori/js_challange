'strict mode';
var fs = require('fs');
var f = '';
f  = fs.readFileSync('input', 'utf8');
var ff = f.split("\n");

//ff = ["ab -1 sffsfs 2 sfsadfssfd 34 sfsdfsdfsfsd aaa    890  aaa"];
//ff = ["abz"];
//ff = ["toggle 0,0 through 0,1", "turn on 1,1 through 1,1"];//, "turn off 1,1 through 2,2", "toggle 0,0 through 2,2"];



var ee = [];


function recur(s){
  var result = true;
  if(typeof(s) == 'string'){
    if( )
  }
}

function red_in_object(s){
  for(var key in s){
    if(s[key] === "red"){
      return true;
    }
  }
  return false;s
}

function contains_directly_red(s){
  if( (typeof(s) === 'object') && red_in_object(s) ){
    return true;
  }
}


function read(s){


    var json = JSON.parse(s);
    console.log(json);
    for( var i in json){
      console.log(json[i]);
      console.log("---------------------");
    }





  console.log("Input: " + s);
  var expr = /([-0-9]+)/g;
  var result = expr.exec(s);
  while(result != null){
    if(result != null){
      console.log("regexp result " + result[1]);
      ee.push(Number(result[1]));
    }
    result = expr.exec(s);
  }
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
