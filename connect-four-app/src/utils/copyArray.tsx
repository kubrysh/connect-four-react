const copyArray = (board: number[][] | number[]): any =>
    board.map((item) => (Array.isArray(item) ? copyArray(item) : item));

export default copyArray;
