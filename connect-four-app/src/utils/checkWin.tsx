const checkHorizontally = (board: any) => {
    // Stringifying board array
    const stringifiedBoard = board.map((row: any) => row.join("")).join(",");
    // Testing for winning combinations
    const matchedStrings = stringifiedBoard.match(/1{4}|2{4}/);

    if (matchedStrings) {
        return matchedStrings[0];
    } else {
        return false;
    }
};

const checkVertically = (board: any) => {
    //Transposing board matrix
    const transposedBoard = board[0].map((c: any, i: any) =>
        board.map((r: any) => r[i])
    );
    // Stringifying & testing for winning combinations
    return checkHorizontally(transposedBoard);
};

const checkDiagLeft = (board: any) => {
    return false;
};

const checkDiagRight = (board: any) => {
    return false;
};

const checkDraft = (board: any) => {
    // Checking if there are none empty cells left
    if (board.length !== 0 && board.flat().every((cell: any) => cell !== 0)) {
        return "draft";
    } else {
        return false;
    }
};

const checkWin = (board: any) => {
    return (
        checkHorizontally(board) ||
        checkVertically(board) ||
        checkDiagLeft(board) ||
        checkDiagRight(board) ||
        checkDraft(board)
    );
};

export default checkWin;
