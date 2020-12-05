const fs = require('fs')

exports.solution = () => {
  let validCount = 0;
  let arr = fs.readFileSync('resources/day2.txt', 'utf-8').split(/\r?\n/);
  for (let pw of arr) {
    let [rule, password] = pw.split(': ');
    let [range, letter] = rule.split(' ');
    let [lower, upper] = range.split('-');

    if ((password[lower - 1] === letter || password[upper - 1] === letter) &&
        !(password[lower - 1] === letter && password[upper - 1] === letter)) {
      validCount++;
    }
  }

  console.log(validCount);
}