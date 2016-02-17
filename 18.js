'use strict';
var fs = require('fs');
var file = fs.readFileSync("input", 'utf8');

var ff = file.split('\n');

var SIZE =100;
var GRID = [];
var STEPS = 100;
var RESULT = [];

function update(bool, x, y){
  if(bool && (
    (x === 0 && y === 0) ||
    (x === 0 && y === SIZE -1) ||
    (x === SIZE -1 && y === 0) ||
    (x === SIZE -1 && y === SIZE -1)
  )
  ){
    RESULT[x][y] = true;
    //console.log("angolo");
    return;
  }

  var n = countOn(x,y);

  if(bool){
    if (n === 2 || n ===3){
      RESULT[x][y] = true;
    } else {
      RESULT[x][y] = false;
    }

  } else{
      if (n === 3){
        RESULT[x][y] = true;
      } else{
        RESULT[x][y] = false;
      }
  }
}

function countOn(x,y){
  var on = 0;

  for(var i = x -1; i <= x + 1 ; i++){
    for( var j = y -1; j <= y + 1 ; j++){
      if(i < 0 || j < 0 || i >= SIZE || j >= SIZE || (i ===x && j === y)) {
      } else{
        if(GRID[i][j] === true){
          on++;
        }
      }
    }
  }
  return on;
}

function iterate(){
  for(var i = 0; i < SIZE; i++){
    for( var j =0; j < SIZE; j++){
      if(j === 0){
        RESULT[i] = [];
      }
      update(GRID[i][j], i, j);
    }
  }
  GRID = RESULT;
  RESULT = [];
}


for(var i = 0; i < SIZE; i++){
  var row = ff[i];
  for( var j = 0; j < row.length ; j++){
    if(j === 0){
      GRID[i] = [];
    }
    var bool = false || row[j] === '#';
    GRID[i].push(bool);
  }

}

for(var i = 0; i < STEPS ; i++){
  iterate();
}

var total = 0;
for(var i = 0; i < SIZE; i++){
  for (var j = 0; j < SIZE; j++){
    if(GRID[i][j]){
      total++;
    }
  }
}

console.log(total);
