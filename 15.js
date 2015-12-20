'use strict';
var fs = require('fs');
var f = '';

f  = fs.readFileSync('input', 'utf8');
var ff = f.split("\n");

var INGREDIENTS = 4;
var MAX = 100;
var CALORIES = 500;

//ff = ['Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8', 'Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3'];
//ff = ["toggle 0,0 through 0,1", "turn on 1,1 through 1,1"];//, "turn off 1,1 through 2,2", "toggle 0,0 through 2,2"];

var ee = [];
var combinations = [];
var counter = [0,0,0,0];
var result = 0;


function Ingredient(name, capacity, durability, flavor, texture, calories){
  this.name = name;
  this.capacity = capacity;
  this.durability = durability;
  this.flavor = flavor;
  this.texture = texture;
  this.calories = calories;
}

Ingredient.prototype.toString = function(){
  return this.name + ": " + this.capacity + ", " + this.durability + ", " + this.flavor;
}


function read(s){
  var arr = /^(\w+): capacity ([^,]+), durability ([^,]+), flavor ([^,]+), texture ([^,]+), calories ([^,]+)/.exec(s);
  console.log(arr);
  ee.push(new Ingredient(arr[1], Number(arr[2]), Number(arr[3]), Number(arr[4]), Number(arr[5]), Number(arr[6]) ) );

}

function initialize_combinations(){

  // combinations[ [0, ..., 99 ], [ ], [ ], [ ] ];
  var column = 0;
  for(var j = 0; j < Math.pow(MAX, INGREDIENTS) ; j++){
//    console.log("Iteration: " + j);
//    console.log(counter);
    addOne();
    if(isMAX()){
      combinations.push([counter[0],counter[1],counter[2],counter[3]]);
//      console.log("Valid: " + counter);
    }
  }
}

function isMAX(){
  var tot = 0;
  for(var i = 0; i < INGREDIENTS; i++){
    tot += counter[i];
  }
  if(tot === 100){
    return true;
  } else {
    return false;
  }
}

function addOne(){
  var column = 0;
  while(column < INGREDIENTS){
    var index = counter[column];
    if(index < MAX -1){
      counter[column] = counter[column] + 1;
      return;
    } else {
      counter[column] = 0;
      column++;
    }

  }
}

function caloriesIs(cal, comb){
  var calories = 0;
  for(var j = 0; j < INGREDIENTS; j++){
    var tmp_calories = ee[j].calories * comb[j];
    //console.log("Tmp_capacity: " + tmp_capacity + ", element capacity: " + ee[j].capacity +", element qty: " + comb[j]);
    calories += tmp_calories;
  }
  if( calories === 500){
    return true;
  } else {
    return false;
  }

}


function visit_combinations(){
  for(var i = 0 ; i < combinations.length; i++){
    var comb = combinations[i];
    console.log("Comb: " + comb);

    var capacity = 0;
    for(var j = 0; j < INGREDIENTS; j++){
      var tmp_capacity = ee[j].capacity * comb[j];
      //console.log("Tmp_capacity: " + tmp_capacity + ", element capacity: " + ee[j].capacity +", element qty: " + comb[j]);
      capacity += tmp_capacity;
    }
    if(capacity < 0){
      capacity = 0;
    }
    //console.log("Totale capacity for combination: " + capacity);

    var durability = 0;
    for(var j = 0; j < INGREDIENTS; j++){
      var tmp_durability = ee[j].durability * comb[j];
      //console.log("Tmp_durability: " + tmp_durability + ", element durability: " + ee[j].durability +", element qty: " + comb[j]);
      durability += tmp_durability;
    }
    if(durability < 0){
      durability = 0;
    }
    //console.log("Totale durability for combination: " + durability);

    var flavor = 0;
    for(var j = 0; j < INGREDIENTS; j++){
      var tmp_flavor = ee[j].flavor * comb[j];
      //console.log("Tmp_flavor: " + tmp_flavor + ", element flavor: " + ee[j].flavor +", element qty: " + comb[j]);
      flavor += tmp_flavor;
    }
    if(flavor < 0){
      flavor = 0;
    }
    //console.log("Totale flavor for combination: " + flavor);

    var texture = 0;
    for(var j = 0; j < INGREDIENTS; j++){
      var tmp_texture = ee[j].texture * comb[j];
      //console.log("Tmp_texture: " + tmp_texture + ", element texture: " + ee[j].texture +", element qty: " + comb[j]);
      texture += tmp_texture;
    }
    if(texture < 0){
      texture = 0;
    }
    //console.log("Totale texture for combination: " + texture);

    var total = capacity * durability * flavor * texture;
    if( total > result && caloriesIs(CALORIES, comb)){
      result = total;
    }
  }
}

//populate in progress
for(var c in ff){
  if(ff[c].trim() !== ""){
    read(ff[c]);
  }
}

initialize_combinations();

visit_combinations();



console.log("----- read finished");
console.log(ee);
console.log(combinations.length);
console.log(combinations);
console.log(result);
