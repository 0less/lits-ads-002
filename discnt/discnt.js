var fs = require("fs");
var inputRows = fs.readFileSync('discnt.in').toString().split(/\r?\n/);
var prices = inputRows[0].split(' ');
var discount = inputRows[1];

var finalPrice = calcTotal(prices);
fs.writeFileSync("discnt.out", finalPrice, 'utf8');

function calcTotal (prices) {
  var finalPrice = 0;

  sortPrices(prices);

  for (var i=0, withDiscount=Math.floor(prices.length/3); i<withDiscount; i++) {
    prices[i] = prices[i] - (prices[i] * discount/100);
  }

  for (var i=0, length=prices.length; i<length; i++) {
    finalPrice += +prices[i];
  }

  return finalPrice.toFixed(2);
}

// reverted Bubble sorting
function sortPrices (prices) {
  for (var i=0, length=prices.length; i<length; i++) {
    for (var j=1; j<(length-i); j++) {
      if (+prices[j] > +prices[j-1]) {
        swap(prices, j, j-1);
      }
    }
  }
}

function swap (arr, first, second) {
  var tmp = arr[first];
  arr[first] = arr[second];
  arr[second] = tmp;
}