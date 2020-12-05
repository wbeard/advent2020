const fs = require('fs');
const tree = '#';
const map = fs.readFileSync('resources/day3.txt', 'utf-8').split(/\r?\n/);

function countTrees([xDelta, yDelta]) {
  let count = 0;
  let x = 0;
  let y = 0;

  while(y < map.length) {
    if (map[y][x] === tree) {
      count++;
    }

    x = (x + xDelta) % map[y].length;
    y = y + yDelta;
  }

  return count;
}

exports.solution1 = () => {
  return countTrees([3, 1]);
}

exports.solution2 = () => {
  const slopes = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]];

  return slopes.reduce((agg, current) => agg * countTrees(current), 1);
}