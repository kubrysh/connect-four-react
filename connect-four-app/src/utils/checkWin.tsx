const checkHorizontally = (board: number[][]) => {
    // Stringifying board array
    const stringifiedBoard = board.map((row) => row.join("")).join(",");
    // Testing for winning combinations
    const matchedStrings = stringifiedBoard.match(/1{4}|2{4}/);

    if (matchedStrings) {
        return ~~matchedStrings[0][0];
    }
    return false;
};

const checkVertically = (board: number[][]) => {
    //Transposing board matrix
    const transposedBoard = board[0].map((c, i) => board.map((r) => r[i]));
    // Stringifying & testing for winning combinations
    return checkHorizontally(transposedBoard);
};

const checkDiagLR = (board: number[][]) => {
    // Checking Left to Right 4 cell slices
    for (let r = 3; r <= 5; r++) {
        for (let c = 0; c <= 3; c++) {
            if (board[r][c]) {
                if (
                    board[r][c] === board[r - 1][c + 1] &&
                    board[r][c] === board[r - 2][c + 2] &&
                    board[r][c] === board[r - 3][c + 3]
                ) {
                    return board[r][c];
                }
            }
        }
    }
    return false;
};

const checkDiagRL = (board: number[][]) => {
    // Checking Right to Left 4 cell slices
    for (let r = 3; r <= 5; r++) {
        for (let c = 3; c <= 6; c++) {
            if (board[r][c]) {
                if (
                    board[r][c] === board[r - 1][c - 1] &&
                    board[r][c] === board[r - 2][c - 2] &&
                    board[r][c] === board[r - 3][c - 3]
                ) {
                    return board[r][c];
                }
            }
        }
    }
    return false;
};

const checkDraft = (board: number[][]) => {
    // Checking if there are none empty cells left
    if (board.length !== 0 && board.flat().every((cell) => cell !== 0)) {
        return "draft";
    }
    return false;
};

const checkWin = (board: number[][]) => {
    return (
        checkHorizontally(board) ||
        checkVertically(board) ||
        checkDiagLR(board) ||
        checkDiagRL(board) ||
        checkDraft(board)
    );
};

export default checkWin;
