var fs = require("fs");
var inputRows = fs.readFileSync('discnt.in').toString().split(/\r?\n/);
var prices = inputRows[0].split(' ');
var discount = inputRows[1];

var finalPrice = calcTotal(prices);
fs.writeFileSync("discnt.out", finalPrice, 'utf8');

function calcTotal (prices) {
  var finalPrice = 0;
  var sortedPrices = reversedMergeSort(prices);

  for (var i=0, withDiscount=Math.floor(sortedPrices.length/3); i<withDiscount; i++) {
    sortedPrices[i] = sortedPrices[i] - (sortedPrices[i] * discount/100);
  }

  for (var i=0, length=sortedPrices.length; i<length; i++) {
    finalPrice += +sortedPrices[i];
  }

  return finalPrice.toFixed(2);
}

function reversedMergeSort (arr) {
  var length = arr.length;
  if (length < 2) return arr;

  var mid = Math.floor(length/2);
  var left = arr.slice(0, mid);
  var right = arr.slice(mid);

  return merge(reversedMergeSort(left), reversedMergeSort(right));
}

function merge (left, right) {
  var i = 0;
  var j = 0;
  var leftLength = left.length;
  var rightLength = right.length;
  var result = [];

  while(i < leftLength && j < rightLength) {
    if (+left[i] > +right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  result = result.concat(left.slice(i)).concat(right.slice(j));

  return result;
}
