(function() {
  var fs = require("fs");
  var inputRows = fs.readFileSync('career.in').toString().split(/\r?\n/);
  var rowsCount = inputRows[0];

  var rows = [];
  var visited = [];
  var bestResult = 0;
  for (var i=0; i<rowsCount; i++) {
    rows[i] = inputRows[i+1].split(' ');
  }

  findBestResult(0, 0, Number(rows[0][0]));
  fs.writeFileSync("career.out", bestResult, 'utf8');

  function findBestResult(row, col, prevSolution) {
    if (visited[row] && visited[row][col] && visited[row][col] >= prevSolution) return;

    if (!visited[row]) visited[row] = [];
    visited[row][col] = prevSolution;

    if (!rows[row+1]) {
      if (prevSolution > bestResult) bestResult = prevSolution;
      return;
    }

    findBestResult(row+1, col,   prevSolution + Number(rows[row+1][col]));
    findBestResult(row+1, col+1, prevSolution + Number(rows[row+1][col+1]));
  }
})();