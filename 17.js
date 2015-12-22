'use strict';
var fs = require('fs');
var f = '';

f  = fs.readFileSync('input', 'utf8');
var ff = f.split("\n");

var TARGET = 150;


//ff = ['20', '15', '10', '5', '5'];
//ff = ["toggle 0,0 through 0,1", "turn on 1,1 through 1,1"];//, "turn off 1,1 through 2,2", "toggle 0,0 through 2,2"];

var ee = [];
var solution = [];

function recur(val, used, remaining){
  var _remaining = remaining.concat([]);
  //console.log("recurring with val: " + val + ", used: " + used + ", remaining: " + _remaining);
  if(val === 0){
    //console.log("found solution: " + used);
    solution.push(used.concat([]).join());
  } else if( val < 0){
      //console.log("invalid solution: " + used);
  } else{
    var currently_used = used.concat([]);
    for(var i = 0; i < remaining.length; i++ ){
      //console.log("iteration " + (1+i) + "/" + remaining.length + " with used: " + currently_used + ", remaining: " + remaining);
      //console.log("before poppping: " + remaining);
      // _remaining = remaining.concat([]);
      // var popped = _remaining.splice(i, 1);
      var popped = _remaining.shift();
      //console.log("popped: " + popped);
      var new_val = val - popped;
      //console.log("new_val: " + new_val);
      if(new_val >=0)
        recur(new_val, currently_used.concat([popped]), _remaining);
    }
  }
}

function solve(){
  recur(TARGET, [], ff);
}

function read(s){
  var arr = /^Sue (\d+): (.*)/.exec(s);
  arr = s;
  //console.log(s);
  ee.push(Number(s));
}


//populate in progress
for(var c in ff){
  if(ff[c].trim() !== ""){
    read(ff[c]);
  }
}


console.log("----- read finished");
//console.log(ee);

solve();
//console.log(solution);
console.log("combinations: " + solution.length);

var h = [];
var dict = {};
solution.map(function(val){ h.push({"key": val, "val": val.split(",").length}) ;  });
//console.log(h);
h.reduce(function(prev, currV){
  var key = currV.key;
  var val = currV.val;
  if(val in dict){
    dict[val] = dict[val] + 1;
  } else {
    dict[val] = 1;
  }
}, {} );

console.log("this is h");
console.log(dict);
