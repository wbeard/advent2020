const fs = require('fs');

exports.solution = () => {
  const arr = fs.readFileSync('resources/day1.txt', 'utf-8').split(/\r?\n/).map(Number);

  for (let firstNumber of arr) {
    for (let secondNumber of arr) {
      for (let thirdNumber of arr) {
        if (firstNumber + secondNumber + thirdNumber === 2020) {
        console.log(firstNumber, secondNumber, thirdNumber, firstNumber * secondNumber * thirdNumber);
      }
      }
    }
  }
}
