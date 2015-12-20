'use strict';
var fs = require('fs');
var f = '';

f  = fs.readFileSync('input', 'utf8');
var ff = f.split("\n");


//ff = ['Sue 500: perfumes: 4, cars: 9, trees: 4'];
//ff = ["toggle 0,0 through 0,1", "turn on 1,1 through 1,1"];//, "turn off 1,1 through 2,2", "toggle 0,0 through 2,2"];

var ee = [];


function Sue(n, children, cats, samoyeds, pomeranians, akitas, vizslas, goldfish, trees, cars, perfumes ){
  this.n=n;
}

Sue.prototype.toString = function(){
  return JSON.stringify(this);
}


function read(s){
  var arr = /^Sue (\d+): (.*)/.exec(s);
  console.log(arr);

  var sue = new Sue(Number(arr[1]) );

  var properties = arr[2].split(',');
  console.log(properties);
  for(var i = 0 ;  i < properties.length; i++){
    var entry = properties[i].split(':');
    console.log("Entry: " + entry);
    var key = entry[0].trim();
    var val = entry[1].trim();
    sue[key] = Number(val);

  }

  ee.push( sue );

}


//populate in progress
for(var c in ff){
  if(ff[c].trim() !== ""){
    read(ff[c]);
  }
}


console.log("----- read finished");
//console.log(ee);

for(var i = 0 ; i < ee.length; i++){
  var sue = ee[i];
  console.log("Sue: " + sue);
  var result = true;
  internal:
  for(var key in sue ){
    //console.log("key: " + key);
    if( ! (typeof(key) === 'undefined' ) ){
      console.log(key + " is not undefined");
      switch(key){
        case "children":
          if(sue[key] !== 3){
            result = false;
            console.log(sue + " fails because of " + key);break internal;
          }
        break;
        case "cats":
        if(!sue[key] > 7){
          result = false;
          console.log(sue + " fails because of " + key);break internal;
        }
        break;
        case "samoyeds":
        if(sue[key] !== 2){
          result = false;
          console.log(sue + " fails because of " + key);break internal;
        }
        break;
        case "pomeranians":
        if(!sue[key] < 3){
          result = false;
          console.log(sue + " fails because of " + key);break internal;
        }
        break;
        case "akitas":
        if(sue[key] !== 0){
          result = false;
          console.log(sue + " fails because of " + key);break internal;
        }
        break;
        case "vizslas":
        if(sue[key] !== 0){
          result = false;
          console.log(sue + " fails because of " + key);break internal;
        }
        break;
        case "goldfish":
        if(!sue[key] < 5){
          result = false;
          console.log(sue + " fails because of " + key);break internal;
        }
        break;
        case "trees":
        if(!sue[key] > 3){
          result = false;
          console.log(sue + " fails because of " + key);break internal;
        }
        break;
        case "cars":
        if(sue[key] !== 2){
          result = false;
          console.log(sue + " fails because of " + key);break internal;
        }
        break;
        case "perfumes":
        if(sue[key] !== 1){
          result = false;
          console.log(sue + " fails because of " + key);break internal;
        }
        break;
      }

    }
  }
  if (result){
    console.log("Sue is number: " + sue.n);
    break;
  }
}
