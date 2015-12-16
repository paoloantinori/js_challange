'strict mode';
var fs = require('fs');
var f = '';
f  = fs.readFileSync('input', 'utf8');
var ff = f.split("\n");

//ff = ["", "abc", "aaa\"aaa", "\x27"];
//ff = ["toggle 0,0 through 0,1", "turn on 1,1 through 1,1"];//, "turn off 1,1 through 2,2", "toggle 0,0 through 2,2"];

var chars = 0;
var memory = 0;
var count = 0;
function read(s){
  console.log(s)
  var partial = 0;

  for (var c in s){
    console.log("char is: " + s.charAt(c));
    var cc =  s.charAt(c);
    chars++;
    if(cc ==='"'){
      partial = partial +2;
    }else if(cc === '\\'){
      partial = partial +2;
    } else{
      partial++;
    }
  }
  partial = partial +2;
  console.log("partial: " + partial);
  count = count + partial;
  var v = eval(s);
  for(var c in v){
    memory++;
  }
}

//populate in progress
for(var c in ff){
  if(ff[c].trim() !== ""){
    read(ff[c]);
  }
}

console.log("----- read finished");
console.log("chars: " + chars);
console.log("memory: " + memory);
console.log("total: " + (chars - memory));
console.log("count: " + count);
console.log("result: " + (count - chars));


//console.log(m);
