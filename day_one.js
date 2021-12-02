const helper_elf = require('./helper_elf');

const check_depths = function(data) {
  let counter = 0;
  const depths = data.split('\n').map(depth => parseInt(depth));
  let lastDepthChecked = depths.shift();
  depths.forEach(depth => {
    if (lastDepthChecked < depth) {
      counter += 1;
    };

    lastDepthChecked = depth;
  })

  console.log('Check depths v1: ', counter);
}

const check_depths_improved = function(data) {
  const getSum = (arr) => arr.reduce((a, b) => a + b);
  const depths = data.split('\n').map(depth => parseInt(depth));
  let counter = 0
  let window = depths.splice(0, 3);
  let lastDepthChecked = getSum(window);

  depths.forEach(depth => {
    window.shift();
    window.push(depth);

    const depthSum = getSum(window);
    if (depthSum > lastDepthChecked) {
      counter += 1;
    }
    lastDepthChecked = depthSum;
  })

  console.log('Check depths v2: ', counter);
}


helper_elf.readFile('d1_inputs.csv')
  .then(check_depths)
  .catch((error) => {
    throw new Error(error);
  })

helper_elf.readFile('d1_inputs.csv')
  .then(check_depths_improved)
  .catch((error) => {
    throw new Error(error);
  })
