(function() {
  var fs = require("fs");
  var inputRows = fs.readFileSync('ijones.in').toString().split(/\r?\n/);
  var boardW = +inputRows[0].split(' ')[0];
  var boardH = +inputRows[0].split(' ')[1];

  var allWays = getAllWays();
  fs.writeFileSync("ijones.out", allWays, 'utf8');

  function getAllWays() {
    var matrix = [], lastCol = [], thisCol = [],
        uniqueWays = getEmptyLettersObj(),
        colUniqueWays, i, j, k, len, letter,
        firstCase, secondCase, result;

    for (i=0; i<boardH; i++) {
      matrix[i] = inputRows[i+1];
      uniqueWays[matrix[i][0]]++;
      lastCol[i] = 1;
      thisCol[i] = 1;
    }

    for (i=1; i<boardW; i++) {
      colUniqueWays = getEmptyLettersObj();

      for (j=0; j<boardH; j++) {
        firstCase = uniqueWays[matrix[j][i]];
        secondCase = matrix[j][i - 1] !== matrix[j][i] ? lastCol[j] : 0;
        thisCol[j] = firstCase + secondCase;
        colUniqueWays[matrix[j][i]] += thisCol[j];
      }
      lastCol = thisCol;

      for (letter in colUniqueWays) {
        uniqueWays[letter] += colUniqueWays[letter];
      }
    }
    result = thisCol[0];
    if (boardH !== 1) result += thisCol[boardH-1];

    return result;
  }

  function getEmptyLettersObj() {
    var letters = 'abcdefghijklmnopqrstuvwxyz';
    var uniqueWays = {};

    for (var i=0; i<letters.length; i++) {
      uniqueWays[letters[i]] = 0;
    }
    return uniqueWays;
  }

})();