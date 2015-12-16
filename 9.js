'strict mode';
var fs = require('fs');
var f = '';
f  = fs.readFileSync('input', 'utf8');
var ff = f.split("\n");

//ff = ["", "abc", "aaa\"aaa", "\x27"];
//ff = ["toggle 0,0 through 0,1", "turn on 1,1 through 1,1"];//, "turn off 1,1 through 2,2", "toggle 0,0 through 2,2"];

var ee = {};
function read(s){
  //console.log(s);
  var arr = /^\b(\w+)\sto\s\b(\w+).*\b(\d+)/.exec(s);
  var entry = {
    start: arr[1],
    end: arr[2],
    dist: arr[3]
  }
  console.log(entry);

  var temp;
  if(entry.start in ee){
    temp = ee[entry.start];
  } else{
    temp = [];
  }

  temp.push(entry);
  ee[entry.start] = temp;

}

function solve(entries){


}

function cartes(a, b){
  var permutations = [];
  for(var c in a){
    for (var d in b){
      permutations.push({"a": a[c], "b": b[d]});
      permutations.push({ "b": b[d], "a": a[c]});
    }
  }
  console.log(permutations);
}

//populate in progress
for(var c in ff){
  if(ff[c].trim() !== ""){
    read(ff[c]);
  }
}

console.log("----- read finished");

console.log(ee);

solve(ee);
cartes(ee['Arbre'], ee['AlphaCentauri']);

//console.log(m);
