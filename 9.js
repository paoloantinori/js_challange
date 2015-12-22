'strict mode';
var fs = require('fs');
var f = '';
f  = fs.readFileSync('input', 'utf8');
var ff = f.split("\n");

//ff = ["", "abc", "aaa\"aaa", "\x27"];
//ff = ["toggle 0,0 through 0,1", "turn on 1,1 through 1,1"];//, "turn off 1,1 through 2,2", "toggle 0,0 through 2,2"];


function Entry(start, end, dist){
  this.start = start;
  this.end = end;
  this.dist = dist;
}

Entry.prototype.toString = function(){return "start: " + this.start + ", end: " + this.end + ", dist: " + this.dist + " ==== ";}

var ee = {};
var permutations = [];
var places = {};
var names = [];
function read(s){
  //console.log(s);
  var arr = /^\b(\w+)\sto\s\b(\w+).*\b(\d+)/.exec(s);
  var entry = new Entry( arr[1], arr[2], Number(arr[3]) );
  console.log(entry);
  places[entry.start] = null;
  places[entry.end] = null;
  if(typeof(ee[entry.end]) === 'undefined'){
    ee[entry.end] = [];
  }
  if(typeof(ee[entry.start]) === 'undefined'){
    ee[entry.start] = [];
  }


  ee[entry.start].push(entry);
  ee[entry.end].push(new Entry(entry.end, entry.start, entry.dist));


}



function get_permutations(){
  while(names.length > 0){
    var entry = names.pop();
    if(permutations.length === 0){
      console.log("pushing first: " + [entry]);
      permutations.push([entry]);
    } else {
      var temp = [];
      //console.log("iterating over " + permutations.length + " permutations");
      for( var i = 0; i < permutations.length; i++){
        var permutation = permutations[i];
        //console.log("current vector length: " + permutation.length);
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

function exists_route(arr, start, end){
  var result = false;

  for(var i = 0 ; i < arr.length; i++){
      var elem = arr[i];
      if(elem.start === start && elem.end === end){
        result = true;
        //console.log("exists route from :" + start + ", to: " + end);
        break;
      }
  }

  return result;
}
var valids = {};

function solve(){
  for(var i = 0; i < permutations.length; i++){
    var comb = permutations[i];
    var comb_score = 0;
    //console.log("checking combination: " + comb);
    for(var j = 0; j < comb.length - 1; j++){
      var cur = comb[j];
      var next = comb[j+1];
      //console.log("cur: " + cur, ", next: " + next);
      var routes = ee[cur];
      //console.log("routes: " + routes);
      if(!exists_route(routes, cur, next)){
        break;
      }
      comb_score += route_dist(cur, next);
      if(j === comb.length -2){
        valids[comb_score] = comb.concat([]);
      }
    }
  }

//console.log(valids);

}

function route_dist(cur,next){
  var routes = ee[cur];
  for(var i = 0; i < routes.length; i++){
    if(routes[i].end === next){
      return routes[i].dist;
    }
  }
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
console.log(places);

var keys = Object.keys(places);
console.log(keys);
for(var i in keys){
    names.push(keys[i]);
}
console.log(names);


get_permutations();

//permutations.forEach(function(e){ console.log(e); });


solve();

var min = 0;
var keys = Object.keys(valids);
for(var i = 0; i < keys.length; i++){
  var elem = Number(keys[i]);
  if(elem > min){
    min =elem;
  }
}

console.log(min);

//cartes(ee['Arbre'], ee['AlphaCentauri']);

//console.log(m);
