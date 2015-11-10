var fs = require("fs");
var inputRows = fs.readFileSync('hamstr.in').toString().split(/\r?\n/);
var food = inputRows[0];
var hamstersCount = inputRows[1];
var hamsters = [];
var count = 0;

for (var i=0; i<hamstersCount; i++) {
  hamsters[i] = inputRows[i+2].split(' ');
}
count = checkHamsters(hamsters, hamstersCount);
fs.writeFileSync("hamstr.out", count, 'utf8');


function checkHamsters (hamsters, hamstersCount) {
  for (var i = hamstersCount; i >= 0; i--) {
    var foodArray = getFoodArray(hamsters, i);
    var sortedFoodArray = mergeSort(foodArray);
    var hamstersEatSum = getFoodSum(sortedFoodArray, i);

    if (hamstersEatSum <= food) {
      return i;
    }
  };
  return 0;
}

function getFoodArray (hamsters, hamstersCount) {
  var hamstersEat = [];
  var hamstersLength = hamsters.length;

  for (var i=0; i<hamstersLength; i++) {
    hamstersEat[i] = +hamsters[i][0] + hamsters[i][1] * (hamstersCount-1);
  };
  return hamstersEat;
}

function getFoodSum (sortedFoodArray, hamstersCount) {
  var sum = 0;

  for (var i=0; i<hamstersCount; i++) {
    sum += sortedFoodArray[i];
  };
  return sum;
}

function mergeSort (arr) {
  var length = arr.length;
  if (length < 2) return arr;

  var mid = Math.floor(length/2);
  var left = arr.slice(0, mid);
  var right = arr.slice(mid);

  return merge(mergeSort(left), mergeSort(right));
}

function merge (left, right) {
  var i = 0;
  var j = 0;
  var leftLength = left.length;
  var rightLength = right.length;
  var result = [];

  while(i < leftLength && j < rightLength) {
    if (left[i] < right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  result = result.concat(left.slice(i)).concat(right.slice(j));

  return result;
}
