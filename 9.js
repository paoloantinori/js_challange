'strict mode';
var fs = require('fs');
var f = '';
f  = fs.readFileSync('input', 'utf8');
var ff = f.split("\n");

//ff = ["", "abc", "aaa\"aaa", "\x27"];
//ff = ["toggle 0,0 through 0,1", "turn on 1,1 through 1,1"];//, "turn off 1,1 through 2,2", "toggle 0,0 through 2,2"];

var ee = [];
var permutations = [];
function read(s){
  //console.log(s);
  var arr = /^\b(\w+)\sto\s\b(\w+).*\b(\d+)/.exec(s);
  var entry = {
    start: arr[1],
    end: arr[2],
    dist: arr[3],
    toString: function(){return "start: " + this.start + ", end: " + this.end + ", dist: " + this.dist + " ==== ";}
  }
  console.log(entry);

  ee.push(entry);

}

function get_permutations(){
  while(ee.length > 0){
    var entry = ee.pop();
    if(permutations.length === 0){
      console.log("pushing first: " + [entry]);
      permutations.push([entry]);
    } else {
      var temp = [];
      console.log("iterating over " + permutations.length + " permutations");
      for( var i = 0; i < permutations.length; i++){
        var permutation = permutations[i];
        console.log("current vector length: " + permutation.length);
        for( var j = 0; j <= permutation.length; j++){
          var perm_a = permutation.slice(0, j);
//          console.log("perm_a: " + perm_a);
          var perm_b = permutation.slice(j, permutation.length);
  //        console.log("perm_b: " + perm_b);
//          console.log("element to insert: " + [entry]);
          var new_perm = perm_a.concat([entry]).concat(perm_b);
//          console.log("New permutation is: " + new_perm);
          temp.push(new_perm);
        }
      }
      permutations = temp;
    }
  }
}

function solve(entries){


}

// function cartes(a, b){
//   var permutations = [];
//   for(var c in a){
//     for (var d in b){
//       permutations.push({"a": a[c], "b": b[d]});
//       permutations.push({ "b": b[d], "a": a[c]  });
//     }
//   }
//   console.log(permutations);
// }

//populate in progress
for(var c in ff){
  if(ff[c].trim() !== ""){
    read(ff[c]);
  }
}

console.log("----- read finished");
console.log(ee);

get_permutations();



solve(ee);
//cartes(ee['Arbre'], ee['AlphaCentauri']);

//console.log(m);
