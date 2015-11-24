var fs = require("fs");
var inputRows = fs.readFileSync('bugtrk.in').toString().split(/\r?\n/);
var data = inputRows[0].split(' ');
var bugsCount = +data[0];
var width = +data[1];
var height = +data[2];

var boardWidth = getBoardLength(bugsCount, width, height);
fs.writeFileSync("bugtrk.out", boardWidth, 'utf8');

function getBoardLength(bugsCount, width, height) {
  var boardMaxWidth = bugsCount * width;
  var boardMaxHeight = bugsCount * height;

  if (boardMaxWidth <= height) return height;
  else if (boardMaxHeight <= width) return width;

  var biggerLength = width > height ? width : height;
  var lowerLength = width < height ? width : height;

  return getLength(biggerLength, lowerLength, bugsCount);
}

function getLength (bigger, lower, cols) {
  var rows = 1;
  var biggerSize = bigger;

  while (lower * Math.ceil(cols/rows) > biggerSize) {
    rows++;
    biggerSize = bigger * rows;
  }
  var prev = lower * Math.ceil(cols/(rows-1));
  biggerSize = bigger * rows;

  return prev < biggerSize ? prev : biggerSize;
}
