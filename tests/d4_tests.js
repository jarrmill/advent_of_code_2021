const funcs = require('../day_four.js');
const helper_elf = require('../helper_elf');
helper_elf.runTest('Check Cols', true, funcs.checkCols([['0', '0', 'X'], ['0', '0', 'X'], ['0', '0', 'X']]))

helper_elf.runTest('Check Rows', true, funcs.checkRows([['0', '0', 'X'], ['X', 'X', 'X'], ['0', '0', '0']]))

helper_elf.runTest('Check Diags Desc', true, funcs.checkDiags([['X', '0', 'X'], ['0', 'X', 'X'], ['0', '0', 'X']]))
helper_elf.runTest('Check Diags Asc', true, funcs.checkDiags([['X', '0', 'X'], ['0', 'X', 'X'], ['X', '0', '0']]))

helper_elf.runTest('Check Cols', false, funcs.checkCols([['0', '0', 'X'], ['0', '0', 'X'], ['0', 'X', '0']]))

helper_elf.runTest('Check Rows', false, funcs.checkRows([['0', '0', 'X'], ['X', '0', 'X'], ['0', '0', '0']]))

helper_elf.runTest('Check Diags', false, funcs.checkDiags([['X', '0', 'X'], ['0', '0', 'X'], ['0', '0', 'X']]))
helper_elf.runTest('Check Diags', false, funcs.checkDiags([['X', '0', 'X'], ['0', '0', 'X'], ['0', '0', 'X']]))

helper_elf.runTest('Get Sum', 6, funcs.getSum([['X', '1'], ['2', 'X'], ['X', '3']]));

helper_elf.runTest('Check Board', -1, funcs.checkBoards([[['X', 'X', '89', 'X', 'X'], ['10', '16', '15', 'X', '19'], ['18', '8', 'X', '26', '20'], ['22', 'X', '13', '6', 'X'], ['X', 'X', '12', '3', 'X']]]))
helper_elf.runTest('Check Board', [0, 1, 2], funcs.checkBoards([[['X', 'X', 'X', 'X', 'X'], ['10', '16', '15', 'X', '19'], ['18', '8', 'X', '26', '20'], ['22', 'X', '13', '6', 'X'], ['X', 'X', '12', '3', 'X']], [['X', 'X', 'X', 'X', 'X'], ['10', '16', '15', 'X', '19'], ['18', '8', 'X', '26', '20'], ['22', 'X', '13', '6', 'X'], ['X', 'X', '12', '3', 'X']], [['X', 'X', 'X', 'X', 'X'], ['10', '16', '15', 'X', '19'], ['18', '8', 'X', '26', '20'], ['22', 'X', '13', '6', 'X'], ['X', 'X', '12', '3', 'X']]]))
helper_elf.runTest('Check Board', [0, 2], funcs.checkBoards([[['X', 'X', 'X', 'X', 'X'], ['10', '16', '15', 'X', '19'], ['18', '8', 'X', '26', '20'], ['22', 'X', '13', '6', 'X'], ['X', 'X', '12', '3', 'X']], [['X', 'X', '8', 'X', 'X'], ['10', '16', '15', 'X', '19'], ['18', '8', 'X', '26', '20'], ['22', 'X', '13', '6', 'X'], ['X', 'X', '12', '3', 'X']], [['X', 'X', 'X', 'X', 'X'], ['10', '16', '15', 'X', '19'], ['18', '8', 'X', '26', '20'], ['22', 'X', '13', '6', 'X'], ['X', 'X', '12', '3', 'X']]]))

helper_elf.runTest('Remove Boards', [[1], [3], [5]], funcs.removeBoards([[1], [2], [3], [4], [5]], [1, 3]));