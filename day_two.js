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

  console.log('CalculateDirections v1: ', Math.abs(x * y));
};

const calculateDirectionsImproved = function(directions) {
  let x = 0;
  let y = 0;
  let aim = 0;

  let inputDirection = {
    forward: function(dist) {
      x += dist
      y += dist * aim
    },
    down: function(dist) {
      aim += dist
    },
    up: function(dist) {
      aim -= dist
    }
  };

  directions.split('\n').forEach((line) => {
    const [direction, distance] = line.split(' ');
    inputDirection[direction](parseInt(distance));
  }); 

  console.log('CalculateDirections v2: ', Math.abs(x * y));
};

helper_elf.readFile('d2_inputs.csv')
  .then(calculateDirections)
  .catch((error) => {
    throw new Error(error);
  })

helper_elf.readFile('d2_inputs.csv')
  .then(calculateDirectionsImproved)
  .catch((error) => {
    throw new Error(error);
  })