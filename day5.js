const fs = require('fs');
const seats = fs.readFileSync('resources/day5.txt', 'utf-8').split(/\r?\n/);

const traverse = (sequence, start, end) => {
  if (sequence.length === 0) {
    return start;
  }

  const traversalInstruction = sequence.shift();
  const mid = Math.floor((start + end) / 2);
  const instructions = {
    F: () => traverse(sequence, start, mid - 1),
    L: () => traverse(sequence, start, mid - 1),
    B: () => traverse(sequence, mid + 1, end),
    R: () => traverse(sequence, mid + 1, end),
  }

  return instructions[traversalInstruction]();
}

function search(sequence, start, end) {
  if (start > end) {
    return 0;
  }

  if (sequence[start + 1] - sequence[start] === 2) {
    return sequence[start] + 1;
  }

  const mid = Math.floor((start + end) / 2);

  return Math.max(
    search(sequence, start, mid - 1),
    search(sequence, mid + 1, end)
  )
}

const seatIds = seats.map((seatSequence) => {
  const columnSequence = seatSequence.slice(0, 7).split('');
  const rowSequence= seatSequence.slice(-3).split('');
  const column = Number(traverse(columnSequence, 0, 127));
  const row = Number(traverse(rowSequence, 0, 7));

  return column * 8 + row;
});

exports.solution1 = () => Math.max(...seatIds);

exports.solution2 = () => search(seatIds.sort((a, b) => a - b), 0, seatIds.length - 1);