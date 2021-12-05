const helper_elf = require('./helper_elf');

const chartThermalLines = function(data) {
  // PART ONE
  const coords = parseLines(data);
  const [maxX, maxY] = getRange(coords);
  let map = getEmptyMap(maxX, maxY);
  map = markMaps(map, coords);
  
  const overlaps = countOverlaps(map);
  //console.log('First map: \n', map.join('\n'))
  console.log('Amount of thermal overlaps pt1: ', overlaps);

  // PART TWO
  let diagMap = getEmptyMap(maxX, maxY);
  diagMap = markMaps(diagMap, coords, true);
  const diagOverlaps = countOverlaps(diagMap);
  //console.log('Diag map:\n', diagMap.join('\n'));
  console.log('Amount of thermal overlaps pt2: ', diagOverlaps);
  
}

const parseLines = function(data) {
  return data.split('\n').map(line => {
    const [fromStr, toStr] = line.split(' -> ');
    return {
      from: {
        x: parseInt(fromStr.split(',')[0]),
        y: parseInt(fromStr.split(',')[1])
      },
      to: {
        x: parseInt(toStr.split(',')[0]),
        y: parseInt(toStr.split(',')[1])
      }
    }
  });
}

const getRange = function(coords) {
  let x = 0;
  let y = 0;

  coords.forEach(coord => {
    const { from, to } = coord
    if (from.x > x) x = from.x;
    if (from.y > y) y = from.y;
    if (to.x > x) x = to.x
    if (to.y > y) y = to.y
  });
  return [x, y]
}

const getEmptyMap = function(cols, rows) {
  const results = [];
  for (let i = 0; i < parseInt(rows) + 1; i++) {
    const col = new Array(parseInt(cols) + 1).fill('.');
    results.push(col); 
  }

  return results;
}

const markMaps = function(m, coords, includeDiags = false) {
  const map = m.slice();
  coords.forEach(coord => {
     const isDiag = (coord.from.x !== coord.to.x && coord.from.y !== coord.to.y);
    if (!includeDiags && isDiag) return;

    const xDirection = (coord.to.x >= coord.from.x) ? 1 : -1;
    const yDirection = (coord.to.y >= coord.from.y) ? 1 : -1;
    let x = coord.from.x;
    let y = coord.from.y;
    while (x !== coord.to.x || y !== coord.to.y){
      if (map[y][x] === '.') {
        map[y][x] = 1;
      } else {
        map[y][x] = parseInt(map[y][x]) + 1;
      }

      if (coord.from.x !== coord.to.x) {
        x += xDirection;
      }
      if (coord.from.y !== coord.to.y) {
        y += yDirection;
      }

    };

    if (map[y][x] === '.') {
      map[y][x] = 1;
    } else {
      map[y][x] = parseInt(map[y][x]) + 1;
    }
  });
  return map;
}

const countOverlaps = function(map) {
  const mapStr = map.join('');
  const skips = new Set(['.','1',','])
  let count = 0;

  for(let i = 0; i < mapStr.length; i++) {
    if (!skips.has(mapStr[i])) {
      count += 1;
    }
  }

  return count;
};
// Read Files & Execute
helper_elf.readFile('d5_inputs.csv')
  .then(chartThermalLines)
  .catch((error) => {
    throw new Error(error);
  });

// Exports for tests
module.exports = {

};
