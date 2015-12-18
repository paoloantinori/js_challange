'use strict';
var fs = require('fs');
var f = '';

f  = fs.readFileSync('input', 'utf8');
var ff = f.split("\n");

//ff = ['Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.','Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.' ];
//ff = ["toggle 0,0 through 0,1", "turn on 1,1 through 1,1"];//, "turn off 1,1 through 2,2", "toggle 0,0 through 2,2"];

var ee = {};
var seconds = 2503;

function Raindeer(name, speed, time, rest){
  this.name = name;
  this.speed = Number(speed);
  this.time = Number(time);
  this.time_left = Number(time);
  this.rest = Number(rest);
  this.position = 0;
  this.resting = false;
  this.resting_time_left = 0;
  this.points = 0;

}

function read(s){
  var arr = /^(\w+)[^\d]+(\d+)[^\d]+(\d+)[^\d]+(\d+)/.exec(s);
  console.log(arr);
  ee[arr[1]] = new Raindeer(arr[1], arr[2], arr[3], arr[4]);

}

//populate in progress
for(var c in ff){
  if(ff[c].trim() !== ""){
    read(ff[c]);
  }
}

for(var i = 0; i< seconds; i++){
  for(var s in ee){
    var r = ee[s];
    console.log("analyzing: " + r.name);
    if(r.resting){
      console.log("is resting");
      r.resting_time_left--;
      if(r.resting_time_left === 0){
        r.resting = false;
        r.time_left = r.time;
      }
    } else {
        console.log("not resting");
        r.position += r.speed;
        r.time_left--;
        if(r.time_left === 0){
          r.resting = true;
          r.resting_time_left = r.rest;
        }
    }
  }
  assignBonus();
}

function assignBonus(){
  var max = -1;
  var rr = [];
  for(var i in ee){
    var r = ee[i];
    console.log(">>>" + r);
    if(r.position >= max){
      if(r.position === max){
        rr.push(r);
      }else{
        max = r.position;
        rr = [r];
      }
    }
  }
  console.log("bonus: " + rr);
  rr.forEach(function(r){
    console.log("assigning points to: " + r);
    r.points = r.points + 1;
  });
}

console.log("----- read finished");
console.log(ee);

var lead = -1;
for(var k in ee){
  var r = ee[k];
  if(r.position > lead){
    lead = r.position;
  }
}
console.log(lead);

var max = -1;
for(var i in ee){
    var r = ee[i];
    if(r.points > max){
      max = r.points;
    }
}

console.log(max);
