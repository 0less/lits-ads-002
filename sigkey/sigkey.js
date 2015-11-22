var fs = require("fs");
var inputRows = fs.readFileSync('sigkey.in').toString().split(/\r?\n/);
var keysCount = +inputRows[0];

var startKeys = [];
var endKeys = [];
for (var i=0; i<keysCount; i++) {
  if (inputRows[i+1].indexOf('a') > -1) {
    startKeys.push(mergeSort(inputRows[i+1]));
  } else {
    endKeys.push(mergeSort(inputRows[i+1]));
  }
}

var pairsCount = findPairs(startKeys, endKeys);
fs.writeFileSync("sigkey.out", pairsCount, 'utf8');

function findPairs (arr) {
  var pairsCount = 0;

  for (var i=0, startLen=startKeys.length; i<startLen; i++) {
    for (var j=0, endLen=endKeys.length; j<endLen; j++) {
      var fullKey = merge(startKeys[i], endKeys[j]);
      if (!fullKey) continue;
      var lastIndex = fullKey.length - 1;

      if (fullKey[lastIndex].charCodeAt(0) === lastIndex + 97) {
        pairsCount++;
        endKeys.splice(j, 1);
        break;
      }
    }
  }
  return pairsCount;
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
    if (left[i] === right[j]) return false;

    if (left[i] < right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  if (left.slice(i))
    result = result.concat(left.slice(i));
  if (right.slice(j))
    result = result.concat(right.slice(j));
  return result;
}
