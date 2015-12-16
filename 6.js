'strict mode';
var fs = require('fs');
var f = '';
f  = fs.readFileSync('input', 'utf8');
var ff = f.split("\n");

//ff = ["turn on 1,1 through 2,2", "turn off 1,1 through 2,2", "toggle 0,0 through 2,2"];
//ff = ["toggle 0,0 through 0,1", "turn on 1,1 through 1,1"];//, "turn off 1,1 through 2,2", "toggle 0,0 through 2,2"];

var a = [];
var MAX = 1000;

for(var i = 0; i < MAX; i++){
  a[i] = [];
  for(var j = 0; j < MAX; j++){
    a[i][j] = {v: 0};

  }
}

function turnOn(s){
  var split = s.split(" ");
  console.log(split);
  go(split[2], split[4], function(b){ return {v: b.v+1}; } );

}

function turnOff(s){
  var split = s.split(" ");
  console.log(split);
  go(split[2], split[4], function(b){
                          var val = b.v -1;
                          if(val < 0){
                            val = 0;
                          }
                          return {v: val };
                        });

}

function toggle(s){
  var split = s.split(" ");
  console.log(split);
  go(split[1], split[3], function(b){ { return {v: b.v+2}; } } );
}

function go(l, r, op){
  var left = l.split(",");
  var right = r.split(",");
  console.log(left);
  console.log(right);
  if(Number(left[0]) > Number(right[0])){
    console.log("Error with input1: " + left + " " + right);
    process.exit(1);
  }
  if(Number(left[1]) > Number(right[1])){
    console.log("Error with input2: " + left + " " + right);
    process.exit(1);
  }

  for(var i = Number(left[0]) ; i <= Number(right[0]); i++){
    for(var j = Number(left[1]); j <= Number(right[1]); j++){
      //console.log("i: " + i +", j: " + j);
      a[i][j] = op(a[i][j]);
    }
  }
}

function count(a){
  var result = 0;
  for(var i = 0; i < MAX; i++){
    for(var j = 0; j < MAX; j++){
      result += (a[i][j]).v;
    }
  }
  return result;
}

function handle(s){
  if (s.indexOf("turn on") !== -1){
    console.log("on");
    turnOn(s);
  } else if (s.indexOf("turn off") !== -1){
      console.log("off");
      turnOff(s);
  } else if (s.indexOf("toggle") !== -1){
      console.log("tog");
      toggle(s);
  } else{
    console.log("discarded: " + s);
  }
}

for(var c in ff){
  handle(ff[c]);
}
//console.log(a);

console.log(count(a));
