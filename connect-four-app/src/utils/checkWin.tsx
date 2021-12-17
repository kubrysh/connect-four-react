const checkHorizontally = (board:any) => {
    // Stringifying board array
    const stringifiedBoard = board.map((row:any) => row.join("")).join(",");
    // Testing for winning combinations
    return stringifiedBoard.match(/1{4}|2{4}/);
}

export const checkWin = (board:any) => {
    return checkHorizontally(board);
}
