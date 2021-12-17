const Row = ({ row, handleMove }: any) => {
    return (
        <div className="row">
            {row.map((cell: any, index: any) => {
                return (
                    <Cell
                        player={cell}
                        columnIndex={index}
                        handleMove={handleMove}
                        key={index}
                    />
                );
            })}
        </div>
    );
};

const Cell = ({ player, columnIndex, handleMove }: any) => {
    return (
        <div
            onClick={() => handleMove(columnIndex)}
            className={`cell ${
                player === 1 ? "is-yellow" : player === 2 ? "is-red" : ""
            }`}
        ></div>
    );
};

const GameBoard = ({ board, handleMove }: any) => {
    return board.map((row: any, rowIndex: any) => {
        return <Row row={row} handleMove={handleMove} key={rowIndex} />;
    });
};

export default GameBoard;
