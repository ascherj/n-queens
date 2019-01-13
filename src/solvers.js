/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = undefined; //fixme
  let board = new Board({ 'n': n });

  for (let i = 0; i < n; i++) {
    board.togglePiece(i, i);
  }

  solution = board.rows();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  let factorial = n;
  if (factorial <= 1) { return 1; }
  for (let i = n - 1; i > 1; i--) {
    factorial *= i;
  }

  solutionCount = factorial;
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  let solution = [];
  let board = new Board({ n: n });
  let queenLocations = [];
  let exhaustedAllCombinations = false;

  if (n !== 0) {
    while (solution.length === 0 && !exhaustedAllCombinations) {
      for (let i = 0; i < n; i++) {
        let currentRow = queenLocations.length;

        board.togglePiece(currentRow, i);
        if (!board.hasAnyQueenConflictsOn(currentRow, i)) {
          queenLocations.push(i);
          i = -1;

          if (queenLocations.length === n) {
            solution = board.rows();
            break;
          }

        } else {

          board.togglePiece(currentRow, i);

          while (i === n - 1) {
            i = queenLocations.pop();

            if (i === n - 1 && queenLocations.length === 0) {
              exhaustedAllCombinations = true;
              let blankBoard = new Board({ n: n });
              solution = blankBoard.rows();
            }

            board.togglePiece(queenLocations.length, i);
          }
        }
      }
    }
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  let board = new Board({ n: n });
  let queenLocations = [];
  let exhaustedAllCombinations = false;

  if (n <= 1) {
    solutionCount++;
  }

  if (n > 1) {
    while (!exhaustedAllCombinations) {
      for (let i = 0; i < n; i++) {
        let currentRow = queenLocations.length;

        board.togglePiece(currentRow, i);
        if (!board.hasAnyQueenConflictsOn(currentRow, i)) {
          queenLocations.push(i);
          i = -1;

          if (queenLocations.length === n) {
            solutionCount++;
            i = queenLocations.pop();
            board.togglePiece(queenLocations.length, i);


            while (i === n - 1) {
              i = queenLocations.pop();
              board.togglePiece(queenLocations.length, i);
            }
          }

        } else {

          board.togglePiece(currentRow, i);

          while (i === n - 1) {
            i = queenLocations.pop();

            if (i === n - 1 && queenLocations.length === 0) {
              exhaustedAllCombinations = true;
            }

            board.togglePiece(queenLocations.length, i);
          }
        }
      }
    }
  }

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

window.findNQueensSolutionV1 = function(n) {
  let solution = [];
  let board;
  let firstQueenIndex = 0;
  let queenCount = 0;
  let exhaustedAllCombinations = false;

  while (!exhaustedAllCombinations) {
    board = new Board({ 'n': n });
    queenCount = 0;

    for (let i = 0; i < n; i++) {
      let currentRow = board.get(i);
      let hasQueen = false;

      for (let j = 0; j < n; j++) {

        if (i === 0) {
          j = firstQueenIndex;
        }

        board.togglePiece(i, j);
        if (!board.hasAnyQueenConflictsOn(i, j)) {
          hasQueen = true;
          queenCount++;
          break;
        } else {
          board.togglePiece(i, j);
        }
      }

      if (!hasQueen) {
        console.log("HERE");
        console.log(board.rows());
        console.log('total queens: ', queenCount);
        console.log('first queen index: ', firstQueenIndex);
        firstQueenIndex++;
        break;
      }
    }

    if (!board.hasAnyQueensConflicts() && queenCount === n) {
      solution = board.rows();
      break;
    } else if (firstQueenIndex === n && solution.length === 0) {
      exhaustedAllCombinations = true;
    }
  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};
