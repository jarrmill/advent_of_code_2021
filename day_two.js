const helper_elf = require('./helper_elf');

const calculateDirections = function(directions) {
  let x = 0;
  let y = 0;

  let inputDirection = {
    forward: function(dist) {
      x += dist
    },
    down: function(dist) {
      y -= dist
    },
    up: function(dist) {
      y += dist
    }
  };

  directions.split('\n').forEach((line) => {
    const [direction, distance] = line.split(' ');
    inputDirection[direction](parseInt(distance));
  }); 

  console.log(Math.abs(x * y));
};

helper_elf.readFile('d2_inputs.csv')
  .then(calculateDirections)
  .catch((error) => {
    throw new Error(error);
  })