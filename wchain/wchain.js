(function() {
  var fs = require("fs");
  var inputRows = fs.readFileSync('wchain.in').toString().split(/\r?\n/);
  var strCount = inputRows[0];
  var strMatrix = [];
  var maxChain = {};

  for (var i=0; i<strCount; i++) {
    var str = inputRows[i+1];
    if (!strMatrix[str.length]) strMatrix[str.length] = [];
    strMatrix[str.length].push(str);
    maxChain[str] = 1;
  }

  var result = getLongestChain();
  fs.writeFileSync("wchain.out", result, 'utf8');

  function getLongestChain() {
    var cutStrings = [],
        sameStrings = [],
        biggerLength, max;

    for (var i=1, len=strMatrix.length; i<len; i++) {
      if (!strMatrix[i]) continue;

      for (var j=0, stringsLen=strMatrix[i].length; j<stringsLen; j++) {
        cutStrings = getCutStrings(strMatrix[i][j]);

        sameStrings = cutStrings.filter(function(n) {
          return strMatrix[i-1] ? strMatrix[i-1].indexOf(n) != -1 : false;
        });

        if (sameStrings.length) {
          biggerLength = 0;
          for (var k=0, sameLen=sameStrings.length; k<sameLen; k++) {
            biggerLength = (maxChain[sameStrings[k]] > biggerLength) ? maxChain[sameStrings[k]] : biggerLength;
          }
          maxChain[strMatrix[i][j]] = biggerLength + 1;
        }
      }
    }

    max = Object.keys(maxChain).reduce(function(m, k){
      return maxChain[k] > m ? maxChain[k] : m;
    }, -Infinity);

    return max;
  }

  function getCutStrings(string) {
    var strArr = [];

    for (var i=0, len=string.length; i<len; i++) {
      strArr.push(string.slice(0, i) + string.slice(i+1, string.length));
    }
    return strArr;
  }
})();