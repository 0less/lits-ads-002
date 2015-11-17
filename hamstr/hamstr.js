var fs = require("fs");
var inputRows = fs.readFileSync('hamstr.in').toString().split(/\r?\n/);
var food = +inputRows[0];
var hamstersCount = +inputRows[1];

var hamsters = [];
for (var i=0; i<hamstersCount; i++) {
  hamsters[i] = inputRows[i+2].split(' ');
}

var count = searchSuitableCount(hamsters, hamstersCount);
fs.writeFileSync("hamstr.out", count, 'utf8');

function searchSuitableCount(hamsters, hamstersCount) {
  var start = 0;
  var end = hamstersCount;
  var middle;

  while (start < end) {
    middle = Math.floor((start + end + 1) / 2);

    if (checkHamsters(hamsters, middle)) {
      end = middle - 1;
    } else {
      start = middle;
    }
  }
  return end;
}

function checkHamsters (hamsters, hamstersCount) {
  var sortedFoodArray = getSortedFoodArray(hamsters, hamstersCount);
  var hamstersEatSum = getFoodSum(sortedFoodArray, hamstersCount);

  return hamstersEatSum > food;
}

function getSortedFoodArray (hamsters, hamstersCount) {
  var hamstersEat = [];
  var hamstersLength = hamsters.length;

  for (var i=0; i<hamstersLength; i++) {
    hamstersEat[i] = +hamsters[i][0] + hamsters[i][1] * (hamstersCount-1);
  }
  return mergeSort(hamstersEat);
}

function getFoodSum (sortedFoodArray, hamstersCount) {
  var sum = 0;

  for (var i=0; i<hamstersCount; i++) {
    sum += sortedFoodArray[i];
  }
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
