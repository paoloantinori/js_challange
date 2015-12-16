'strict mode';
var fs = require('fs');
var f = '';
f  = fs.readFileSync('input', 'utf8');
var ff = f.split("\n");

ff = ["1321131112"];
//ff = ["toggle 0,0 through 0,1", "turn on 1,1 through 1,1"];//, "turn off 1,1 through 2,2", "toggle 0,0 through 2,2"];


function occ(s){
  //console.log("word is:" +s);
  var pos = 0;
  var c = s.charAt(pos);
  //console.log("char is:" + c);
  while(s.charAt(pos+1) === c){
    pos++;
  }
  ee = s.substring(pos+1, s.length);
  //console.log("Subs: " + ee);
  return {"char": c, "count": pos+1}
}

function read_word(s){
  var partial = [];
  var result = "";
  while(ee.length !== 0){
    partial.push(occ(ee));
  }
  for( var index in partial){
      result += (partial[index].count + partial[index].char);
  }
  return result;
}

var ee;
function read(s){
  ee = s;
  var result = "";
  for(var i = 0 ; i < 50; i++){
    result = read_word(ee);
    ee = result;
  }

  console.log(result);

}



//populate in progress
for(var c in ff){
  if(ff[c].trim() !== ""){
    read(ff[c]);
  }
}

console.log("----- read finished");

console.log(ee);
console.log(ee.length);


//console.log(m);
