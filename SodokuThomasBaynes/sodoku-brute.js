
var board = [
        0, 0, 0,  0, 0, 0,  0, 0, 6,
        0, 3, 0,  0, 7, 1,  0, 4, 0,
        0, 0, 0,  0, 0, 0,  8, 0, 0,

        0, 0, 0,  9, 0, 8,  0, 7, 1,
        1, 0, 3,  0, 0, 0,  0, 0, 0,
        0, 0, 2,  0, 3, 0,  9, 0, 0,

        5, 0, 7,  0, 0, 6,  0, 0, 0,
        2, 0, 0,  0, 0, 0,  7, 0, 0,
        0, 0, 1,  8, 0, 0,  0, 0, 2,
    ];

var backtrackCount = 0;

// index -> { row, col }
// index divided by 9 to find Row. Remainder of dividing index by 9 to find column.
function indexToRowCol(index) {
    return { row: Math.floor(index / 9), col: index % 9 };
}

// convert row and column  to Index.
function rowColToIndex(row, col) {
    return row * 9 + col;
}

function solve(index) {
    //Whilst index is less than total board length & board at specific index exists, add one to index.
    while (index < 81 && board[index]) ++index;
    if (index == 81) return true; // Board solved.
    //Get valid future moves.
    let moves = getChoices(board, index);
    for (let m of moves) {
        board[index] = m; // try one choice
        if (solve(index + 1)) { // if we can solve for the next cell.
            return true; // success.
        }
    }
    board[index] = 0;  // this is reached if moves failed.
    backtrackCount++;
    return false;      // backtrack
}

//cycles through values 1 to 9, pushing the value if 'acceptable.
function getChoices(board, index) {
    let choices = [];
    for (let value = 1; value <= 9; ++value) {
        if (acceptable(board, index, value)) choices.push(value);
    }
    return choices;
}

// if the value is already present, then return false. The passed in variable 'value' to method 'Acceptable' is already present (invalid).
function acceptable(board, index, value) {
    let { row, col } = indexToRowCol(index);

    // if already present on the row, not acceptable
    for (let r = 0; r < 9; ++r) // loop through rows.
        if (board[rowColToIndex(r, col)] == value) return false; 

    // if already present on the column, not acceptable.
    for (let c = 0; c < 9; ++c) // loop through columns.
        if (board[rowColToIndex(row, c)] == value) return false;

    // if already present in the same 3x3 square, also not acceptable
    let r1 = Math.floor(row / 3) * 3;
    let c1 = Math.floor(col / 3) * 3;
    for (let r = r1; r < r1 + 3; ++r) {
        for (let c = c1; c < c1 + 3; ++c) {
            if (board[rowColToIndex(r, c)] == value) return false;
        }
    }
    
    return true;
}

solve(0);

// Display sodoku board
for(i = 0; i < board.length; i++) {
    if (i % 9 === 0 && i != 0) document.write("<br>");

    if (i % 27 === 0) {
        document.write("---------------------------");
        document.write("<br>");
    }

    if (i % 3 === 0) document.write(" | ");

    document.write(" " + board[i]);
}

document.write("<br><br>Backtrack Count: " + backtrackCount);
