const fs = require('fs');
const requiredFieldRules = {
  byr: val => +val >= 1920 && +val <= 2002,
  iyr: val => +val >= 2010 && +val <= 2020,
  eyr: val => +val >= 2020 && +val <= 2030,
  hgt: val => {
    const unitOfMeasurement = val.slice(-2);
    const [measurement] = val.split(unitOfMeasurement)

    if (unitOfMeasurement === 'cm') {
      return +measurement >= 150 && +measurement <= 193
    }

    if (unitOfMeasurement === 'in') {
      return +measurement >= 59 && +measurement <= 76
    }
  },
  hcl: val => /^#[a-fA-F0-9]{6}$/.test(val),
  ecl: val => new Set(['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']).has(val),
  pid: val => /^\d{9}$/.test(val),
};
const fieldRules = {
  ...requiredFieldRules,
  cid: () => true
}
const requiredFields = new Set(Object.keys(requiredFieldRules));

const createCredentials = () => {
  let index = 0;
  let credentials = [];
  let input = fs.readFileSync('resources/day4.txt', 'utf-8').split(/\r?\n/);

  for (let line of input) {
    if (line === '') {
      index++;
      continue;
    }

    if (typeof credentials[index] === 'undefined') {
      credentials[index] = {};
    }

    let parts = line.split(' ');
    for (let part of parts) {
      let [key, val] = part.split(':');
      credentials[index][key] = val;
    }
  }

  return credentials;
}

exports.solution1 = () => {
  let validCount = 0;
  const credentials = createCredentials();

  for (let credential of credentials) {
    const credKeySet = new Set(Object.keys(credential));
    const diff = new Set([...requiredFields].filter(x => !credKeySet.has(x)));

    if (diff.size === 0 || (diff.size === 1 && diff.has('cid'))) {
      validCount++;
    }
  }

  return validCount;
}

exports.solution2 = () => {
  const credentials = createCredentials();
  let invalidCount = 0;

  for (let credentialIndex in credentials) {
    const credential = credentials[credentialIndex];
    const credKeySet = new Set(Object.keys(credential));
    const diff = new Set([...requiredFields].filter(x => !credKeySet.has(x)));

    if (diff.size === 0 || (diff.size === 1 && diff.has('cid'))) {
      for (let credKey of credKeySet) {
        const ruleFn = fieldRules[credKey];
        const val = credential[credKey];

        if (!ruleFn(val)) {
          invalidCount++;
          break;
        }
      }
    } else {
      invalidCount++;
    }
  }


  return credentials.length - invalidCount;
}