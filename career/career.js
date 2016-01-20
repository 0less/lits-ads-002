(function() {
  var fs = require("fs");
  var inputRows = fs.readFileSync('career.in').toString().split(/\r?\n/);
  var rowsCount = inputRows[0];

  var rows = [];
  var solutions = [];
  var visited = [];
  for (var i=0; i<rowsCount; i++) {
    rows[i] = inputRows[i+1].split(' ');
  }

  addSolutions(0, 0, Number(rows[0][0]));
  fs.writeFileSync("career.out", getMaxValue(), 'utf8');

  function getMaxValue() {
    var max = 0;
    for (var i = 0; i < solutions.length; i++ ) {
      if (solutions[i] > max) max = solutions[i];
    }
    return max;
  }

  function addSolutions(row, col, prevSolution) {
    if (visited[row] && visited[row][col] && visited[row][col] >= prevSolution) return;

    if (!visited[row]) visited[row] = [];
    visited[row][col] = prevSolution;

    if (!rows[row+1]) {
      solutions.push(prevSolution);
      return;
    }

    addSolutions(row+1, col, prevSolution + Number(rows[row+1][col]));
    addSolutions(row+1, col+1, prevSolution + Number(rows[row+1][col+1]));
  }
})();