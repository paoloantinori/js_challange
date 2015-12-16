'strict mode';
var fs = require('fs');
var f = '';
f  = fs.readFileSync('input', 'utf8');
var ff = f.split("\n");

//ff = ["Alice would gain 54 happiness units by sitting next to Bob.", "Alice would lose 81 happiness units by sitting next to Carol."];
//ff = ["toggle 0,0 through 0,1", "turn on 1,1 through 1,1"];//, "turn off 1,1 through 2,2", "toggle 0,0 through 2,2"];

var ee = [];
var permutations = [];

function Friend(id, n){
  this.id = id;
  this.n = n;
}

function Person(id){
  this.id = id;
  this.friends = [];
}

Person.prototype.toString = function(){
  return "{id: " + this.id + ", friends: " + this.friends + "}";
}

Friend.prototype.toString = function(){
  return "[id: " + this.id + ", value: " + this.n + "]";
}

function read(s){
  //console.log(s);
  //Alice would gain 54 happiness units by sitting next to Bob.
  //Alice would lose 81 happiness units by sitting next to Carol.
  var arr = /^\b(\w+)\swould\s\b(\w+)\s+\b(\d+).*\s\b(\w+)\./.exec(s);
  if(arr[2] === "lose"){
    arr[3] = "-" + arr[3];
  }
  arr[3] = Number(arr[3]);
//  console.log("line: " + s);
  //console.log("n: " + arr[3]);
  var entry = new Person(arr[1]);

  var found = false;
  ee.forEach(function(e){  found =  (found || (e.id === entry.id)) });
  //console.log("found: " + found);
  if(!found){
    entry.friends.push(new Friend(arr[4], arr[3]));
    ee.push(entry);
  } else{
    var index = -1;
    ee.forEach(function(e, i){if(e.id === entry.id) index = i;});
    ee[index].friends.push(new Friend(arr[4], arr[3]));
  }


//  console.log(entry);


}

function get_permutations(){
  while(ee.length > 0){
    var entry = ee.pop();
    if(permutations.length === 0){
//      console.log("pushing first: " + [entry]);
      permutations.push([entry]);
    } else {
      var temp = [];
  //    console.log("iterating over " + permutations.length + " permutations");
      for( var i = 0; i < permutations.length; i++){
        var permutation = permutations[i];
//        console.log("current vector length: " + permutation.length);
        for( var j = 0; j <= permutation.length; j++){
          var perm_a = permutation.slice(0, j);
//          console.log("perm_a: " + perm_a);
          var perm_b = permutation.slice(j, permutation.length);
//          console.log("perm_b: " + perm_b);
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

var best = -1;
var solution;
function solve(entries){

  for( var i = 0 ; i < entries.length; i++){
    var permutation = entries[i];
    var entry_score = 0;
    //console.log("Permutation: " + permutation);
    for(var j = 0; j < permutation.length; j++){
      var person = permutation[j];
      //console.log("Analyzing: " + person);
      var friends = person.friends;
      //console.log("J: " + j);
      var next_index = (j === permutation.length -1) ? 0 : j+1;
      //console.log("Next index: " + next_index);
      var next = permutation[next_index];

      var prev_index = (j === 0) ? permutation.length -1 : j-1;
      var prev = permutation[prev_index];

    //  console.log("Next: " + next);

      var friend_index = null;
      //console.log("Friends: " + friends);
      friends.forEach(function(e,i){if(e.id === next.id) friend_index = i;});
      if(friend_index !== null){
        var score = friends[friend_index].n;
        //console.log("Adding " + score + " for " + friends[friend_index].id);
        entry_score += score;
      }

      friend_index = null;
      //console.log("Friends: " + friends);
      friends.forEach(function(e,i){if(e.id === prev.id) friend_index = i;});
      if(friend_index !== null){
        var score = friends[friend_index].n;
        //console.log("Adding "+ score + " for " + friends[friend_index].id);
        entry_score += score;
      }



    }
    //console.log("Partial score:" + entry_score);
    if(entry_score > best){
      best = entry_score;
      solution = permutation;

    }
  }
  console.log("Best: " + best);
  console.log("Solution : " + solution);
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

console.log("permutations length: " + permutations.length);


solve(permutations);

//cartes(ee['Arbre'], ee['AlphaCentauri']);

//console.log(m);
