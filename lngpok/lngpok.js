var fs = require("fs");
var inputRows = fs.readFileSync('lngpok.in').toString().split(/\r?\n/);
var cards = inputRows[0].split(' ').map(function(item) {
  return parseInt(item, 10);
});

var longestCardsLine = findLongestCardsLine(cards);
/*fs.writeFileSync("lngpok.out", longestCardsLine, 'utf8');*/

function findLongestCardsLine(cards) {
  var sortedCards = mergeSort(cards);
  var jokers = 0;
  var longestLine = 0;
  var result = 0;

  while (sortedCards[0] < 1) {
    sortedCards.shift();
    jokers++;
  }

  for (var i=0, len=sortedCards.length; i<len; i++) {
    result = checkFrom(i, sortedCards, jokers);
    longestLine = longestLine > result ? longestLine : result;
  }

  return longestLine || jokers;
}

function checkFrom(i, sortedCards, jokers) {
  var longestLine = 1;
  var clone = sortedCards.slice(0);
  for (var j=i; j<clone.length-i; j++) {
    if (clone[j+1] === clone[j]+1) {
      longestLine++;
    } else {
      if (jokers) {
        clone.splice(j+1, 0, clone[j]+1);
        longestLine++;
        jokers--;
      } else {
        break;
      }
    }
  }
  return longestLine;
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
    if (left[i] === right[j] && left[i] !== 0) {
      i++;
    } else if (left[i] < right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  result = result.concat(left.slice(i)).concat(right.slice(j));

  return result;
}
