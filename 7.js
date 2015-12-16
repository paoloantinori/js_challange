'strict mode';
var fs = require('fs');
var f = '';
f  = fs.readFileSync('input', 'utf8');
var ff = f.split("\n");

//ff = ["turn on 1,1 through 2,2", "turn off 1,1 through 2,2", "toggle 0,0 through 2,2"];
//ff = ["toggle 0,0 through 0,1", "turn on 1,1 through 1,1"];//, "turn off 1,1 through 2,2", "toggle 0,0 through 2,2"];

var m = {};
var solution = {};

function readEnd(s){
  console.log("readEnd: " + s);
  var vv = /.*\b(\w+)\b$/.exec(s);
  if(vv == null){
    console.log("readEnd - bad input: " + s);
    process.exit(-1);
  } else {
    vv = vv[1];
  }
  console.log("identifier: " + vv);

  return vv;
}

function handleAassign(p, s){
  var v = s.trim();
  if( /[0-9]+/.test(v) ){
    console.log("handleAassign: " + s);
    console.log(v + " is a number, adding it to solution")
    v = Number(v);
    solution[p] = v;
    delete m[p];
    console.log("ASSIGN solved: " + p + " - " + v);
  } else {
    console.log("handleAassign: " + s);
      if(v in solution){

        var o = Number(solution[v]);
        solution[p] = o;
        delete m[p];
        console.log("ASSIGN solved: " + p + " - " + o);
      }
  }
}

function handleAnd(p, s){
  var arr = s.split("->")[0];

  var splitted = arr.split(" ");
  var a = splitted[0];
  var b = splitted[2];
  var a_set = false;
  var a_val;
  if (a in solution){
    a_set = true;
    a_val = solution[a];
  } else if (isNumber(a)){
    a_set = true;
    a_val = Number(a);
  }
  if(  a_set  ){
    var b_set = false;
    var b_val;
    if(b in solution){
      b_set = true;
      b_val = solution[b];
    } else if(isNumber(b)){
      b_set = true;
      b_val = Number(b);
    }
    if(  b_set ){
      console.log("handleAnd: " + s);
      var temp = Number(a_val) & Number(b_val);
      console.log("AND solved: " + p + " - " + temp);
      delete m[p];
      solution[p] = temp;
    }
  }

}
function handleOr(p, s){
  var arr = s.split("->")[0];

  var splitted = arr.split(" ");
  var a = splitted[0];
  var b = splitted[2];
  var a_set = false;
  var a_val;
  if (a in solution){
    a_set = true;
    a_val = solution[a];
  } else if( isNumber(a) ){
    a_set = true;
    a_val = a;
  }
  if(  a_set  ){
    var b_set = false;
    var b_val;
    if(b in solution){
      b_set = true;
      b_val =  solution[b];
    }else if(isNumber(b)){
      b_set = true;
      b_val =  b;
    }
    if(  b_set  ){
      console.log("handleOr: " + s);
      var temp = Number(a_val) | Number(b_val);
      console.log("OR solved: " + p + " - " + temp);
      delete m[p];
      solution[p] = temp;
    }
  }
}
function handleLshift(p, s){
  var arr = s.split("->")[0];

  var splitted = arr.split(" ");
  var a = splitted[0];
  var b_val = splitted[2];

  var a_set = false;
  var a_val;
  if(a in solution){
    a_set = true;
    a_val = solution[a];
  }else if(isNumber(a)){
    a_set = true;
    a_val = a;
  }

  if(  a_set ){
    console.log("handleLshift: " + s);

    var temp = Number(a_val) << Number(b_val);
    console.log("LSHIFT solved: " + p + " - " + temp);
    delete m[p];
    solution[p] = temp;

  }
}
function hanldeRshift(p, s){
  var arr = s.split("->")[0];

  var splitted = arr.split(" ");
  var a = splitted[0];
  var b_val = splitted[2];
  var a_set = false;
  var a_val;
  if(a in solution){
    a_set = true;
    a_val = solution[a];
  }else if(isNumber(a)){
    a_set = true;
    a_val = a;
  }
  if( a_set ){
    console.log("hanldeRshift: " + s);

    var temp = Number(a_val) >> Number(b_val);
    console.log("RSHIFT solved: " + p + " - " + temp);
    delete m[p];
    solution[p] = temp;

  }
}
function handleNot(p, s){
  var arr = s.split("->")[0];

  var splitted = arr.split(" ");
  var a = splitted[1];
  var a_set = false;
  var a_val;
  if(a in solution){
    a_set = true;
    a_val = solution[a];
  }else if(isNumber(a)){
    a_set = true;
    a_val = a;
  }
  if (a_set ){
    console.log("handleNot: " + s);

    if(a_val >= 65535){
      console.log("Value " + a_val + " is too large")
      process.exit(-1);
    }
    var temp = Number(65535 - a_val);
    console.log("NOT solved: " + p + " - " + temp);
    delete m[p];
    solution[p] = temp;
  }
}

function handle(p, s){
  if (s.indexOf("AND") !== -1){
      handleAnd(p, s);
  } else if (s.indexOf("OR") !== -1){
      handleOr(p, s);
  } else if (s.indexOf("LSHIFT") !== -1){
      handleLshift(p, s);
  } else if (s.indexOf("RSHIFT") !== -1){
      hanldeRshift(p, s);
  } else if (s.indexOf("NOT") !== -1){
      handleNot(p, s);
  } else{
      handleAassign(p, s);
  }
}

function isNumber(s){
  return /\d+/.test(s);
}

function read(s){
  var name = readEnd(s);
  var arr = s.split("->")[0];
  m[name] = arr.trim();
}

function allNumbers(m){
  for(p in m){
      return false;
  }
  return true;
}

//populate in progress
for(var c in ff){
  if(ff[c].trim() !== ""){
    read(ff[c]);
  }
}

console.log("----- read finished");
console.log(m);

while(!allNumbers(m)){
  for(p in m){
    handle(p, m[p]);
    console.log("----");
  }
  console.log("==============");
  console.log(solution);
}

console.log(solution);


//console.log(m);
