const copyArray = (board: any) =>
    board.map((item: any) => (Array.isArray(item) ? copyArray(item) : item));

export default copyArray;
