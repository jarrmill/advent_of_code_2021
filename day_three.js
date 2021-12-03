const helper_elf = require('./helper_elf');

const getPowerConsumption = function(data) {
  const lines = data.split('\n');
  let gamma = '';
  let epsilon = '';

  for (let i = 0; i < lines[0].length; i++) {
    const mostCommon = getMostCommon(lines, i);
    gamma += mostCommon.toString();
    epsilon += (mostCommon) ? '0' : '1';
  }

  let gammaInt = parseInt(gamma, 2);
  let epInt = parseInt(epsilon, 2);
  console.log('Power Consumption', gammaInt * epInt);
};

const getMostCommon = function(arrList, idx) {
  let ones = 0;
  let zeroes = 0;

  for (let i = 0; i < arrList.length; i++) {
    if (arrList[i][idx] === '1') {
      ones += 1;
    } else {
      zeroes += 1;
    }
  }
  if (ones === zeroes) return 1;
  return ones > zeroes ? 1 : 0;
}

//     ____             __     ______             
//    / __ \____ ______/ /_   /_  __/      ______ 
//   / /_/ / __ `/ ___/ __/    / / | | /| / / __ \
//  / ____/ /_/ / /  / /_     / /  | |/ |/ / /_/ /
// /_/    \__,_/_/   \__/    /_/   |__/|__/\____/ 

const getLifeSupport = function(data) {
  const lines = data.split('\n');
  let oxygen = lines.slice();
  let oxygenCounter = 0;
  let co2 = lines.slice();
  let co2Counter = 0; 

  while (oxygen.length > 1) {
    oxygen = filterLines(oxygen, oxygenCounter, true);
    oxygenCounter += 1;
  }

  while (co2.length > 1) {
    co2 = filterLines(co2, co2Counter, false);
    co2Counter += 1;
  }
  
  const oxInt = parseInt(oxygen[0], 2);
  const co2Int = parseInt(co2[0], 2);

  console.log('Life Support Rating: ', oxInt * co2Int);
}

const filterLines = function(arrList, idx, retainMostCommon = true) {
  const mostCommon = getMostCommon(arrList, idx);
  return arrList.filter((line) => {
    if (retainMostCommon && line[idx] === mostCommon.toString()) return true;
    if (!retainMostCommon && line[idx] !== mostCommon.toString()) return true;
    return false;
  });
}

helper_elf.readFile('d3_inputs.csv')
  .then(getPowerConsumption)
  .catch((error) => {
    throw new Error(error);
  });

helper_elf.readFile('d3_inputs.csv')
  .then(getLifeSupport)
  .catch((error) => {
    throw new Error(error);
  })