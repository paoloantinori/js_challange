'strict mode';
var fs = require('fs');
var f = '';
f  = fs.readFileSync('input', 'utf8');
var ff = f.split("\n");

ff = ["hepxxyzz"];
//ff = ["abz"];
//ff = ["toggle 0,0 through 0,1", "turn on 1,1 through 1,1"];//, "turn off 1,1 through 2,2", "toggle 0,0 through 2,2"];



var ee;
function read(s){
  var next = s
  // console.log(valid3("abcde"));
  // console.log(valid3("aabcc"));
  // console.log(valid3("aaab"));
  while(true){
    console.log("candidate word:" + next);
    next = next_word(next);
    if(valid1(next) && valid2(next) && valid3(next)){
      console.log(next);
      break;
    }
  }

}

function valid1(s){
  for(var i =0 ; i <= s.length -3; i++){
    if(s.charCodeAt(i) === (s.charCodeAt(i+1) -1) &&
      (s.charCodeAt(i+1) === (s.charCodeAt(i+2) -1) ) ){
        return true;
    }
  }
  return false;
}

function valid2(s){
  return s.indexOf('i') < 0 && s.indexOf('o') < 0 && s.indexOf('l') < 0;
}

function valid3(s, found_first){
  console.log("analyzing: "+s);
  for(var i =0 ; i <= s.length -2; i++){
    console.log("in the loop for i = " +i);
    if(s.charCodeAt(i) === (s.charCodeAt(i+1))){
        console.log(s + "  has at least a valid token");
        if(!!found_first){
          return true;
        }
        return valid3(s.slice(i+2), true);
    }
  }
  return false;
}

function next_word(s){
  var new_word;
  var candidate_position = s.length -1;
  try{
    new_word = s.slice(0, candidate_position) + bump_letter(s.charAt(candidate_position))+ s.slice(candidate_position+1);
  } catch(e){
    console.log("exception handling: " + s);
    var temp = (s.slice(0, s.length -1) + "a");
    console.log("temp: " + temp);
    candidate_position--;
    try{
      new_word = temp.slice(0, candidate_position ) + bump_letter(temp.charAt(candidate_position)) + temp.slice(candidate_position+1);
    } catch(e1){
      var subproblem = temp.slice(0, candidate_position + 1);
      var remaining = temp.slice(candidate_position+1);
      console.log("subproblem: " + subproblem);
      console.log("remaining: " + remaining);
      return (next_word(subproblem) + remaining);
    }

    console.log("new_word: " + new_word);
  }
  console.log(new_word);
  return new_word;
}

function bump_letter(letter){
  var curr = letter.charCodeAt(0);
  if(curr !== "z".charCodeAt(0)){
    return String.fromCharCode(curr+1);
  } else {
    throw "Exception";
  }
}



//populate in progress
for(var c in ff){
  if(ff[c].trim() !== ""){
    read(ff[c]);
  }
}

console.log("----- read finished");



//console.log(m);
