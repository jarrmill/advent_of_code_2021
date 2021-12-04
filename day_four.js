const helper_elf = require('./helper_elf');

const beatSquid = function (data) {
  let [instructions, boards] = parseData(data);
  let alreadyFoundWinningBoard = false;
  for (let i = 0; i < instructions.length; i++) {
    const luckyNum = instructions[i]
    boards = markBoards(boards, luckyNum);
    const winningBoards = checkBoards(boards);

    if (winningBoards !== -1 && boards.length === 1) {
      const lastSum = getSum(boards[0]);
      console.log('Worst board!', boards, lastSum, luckyNum);
      console.log('To let squid win use: ', lastSum * luckyNum);
      return;
    }
    if (winningBoards !== -1) {
      const sum = getSum(boards[winningBoards[0]]);
      if (!alreadyFoundWinningBoard) {
        console.log('Winner!: ', boards[winningBoards[0]], winningBoards[0]);
        console.log('To beat squid use: ', sum * luckyNum);
        alreadyFoundWinningBoard = true;
      }
      boards = removeBoards(boards, winningBoards);
    }
  }
}

const markBoards = function (b, number) {
  const boards = b.slice();
  boards.forEach(board => {
    board.forEach((row) => {
      if (row.indexOf(number) !== -1) {
        row[row.indexOf(number)] = 'X';
        return;
      }
    })
  })

  return boards;
}

const checkBoards = function (boards) {
  const winningBoards = [];
  for (let i = 0; i < boards.length; i++) {
    const b = boards[i]
    if (checkRows(b) || checkCols(b)) {
      winningBoards.push(i);
    }
  }
  return winningBoards.length ? winningBoards : -1;
}

const checkRows = function (board) {
  for (let i = 0; i < board.length; i++) {
    let count = 0;
    board[i].forEach(char => {
      if (char === 'X') count += 1;
    })
    if (count === board.length) return true;
  }
  return false;
};

const checkCols = function (board) {
  for (let i = 0; i < board.length; i++) {
    let count = 0;
    for (let j = 0; j < board[0].length; j++) {
      if (board[j][i] === 'X') count += 1;
    }
    if (count === board.length) return true;
  }
  return false;
};

const checkDiags = function (board) {
  let downCount = 0;
  let upCount = 0;
  for (let i = 0; i < board.length; i++) {
    if (board[i][i] === 'X') downCount += 1;
    if (board[board.length - 1 - i][i] === 'X') upCount += 1;
  }
  return (downCount === board.length || upCount === board.length);
}

const removeBoards = function (boards, winningBoards) {
  const results = [];
  for (let i = 0; i < boards.length; i++) {
    if (winningBoards.indexOf(i) === -1) {
      results.push(boards[i]);
    }
  }
  return results;
}

const parseData = function (data) {
  const lines = data.split('\n');
  const instructions = lines.shift().split(',');
  let boards = [[]];
  lines.shift();

  while (lines.length) {
    const row = lines.shift();
    if (row === '') {
      boards.push([]);
    } else {
      boards[boards.length - 1].push(row.split(' ').filter(char => char !== ''));
    }
  };
  return [instructions, boards];
}

const getSum = function (board) {
  let sum = 0;
  board.forEach(row => {
    row.forEach(num => {
      if (num !== 'X') sum += parseInt(num);
    })
  })

  return sum;
}
//     ____             __     ______             
//    / __ \____ ______/ /_   /_  __/      ______ 
//   / /_/ / __ `/ ___/ __/    / / | | /| / / __ \
//  / ____/ /_/ / /  / /_     / /  | |/ |/ / /_/ /
// /_/    \__,_/_/   \__/    /_/   |__/|__/\____/ 




// Read Files & Execute
helper_elf.readFile('d4_inputs.csv')
  .then(beatSquid)
  .catch((error) => {
    throw new Error(error);
  });

// Exports for tests
module.exports = {
  checkRows,
  checkCols,
  checkDiags,
  getSum,
  checkBoards,
  removeBoards
};