type HandleMove = (columnIndex: number) => void;

interface RowProps {
    row: number[];
    handleMove: HandleMove;
}

interface CellProps {
    player: number;
    columnIndex: number;
    handleMove: HandleMove;
}

interface GameBoardProps {
    board: number[][];
    handleMove: HandleMove;
}

const Row = ({ row, handleMove }: RowProps) => {
    return (
        <div className="row">
            {row.map((cell: number, index: number) => {
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

const Cell = ({ player, columnIndex, handleMove }: CellProps) => {
    return (
        <div
            onClick={() => handleMove(columnIndex)}
            className={`cell ${
                player === 1 ? "is-yellow" : player === 2 ? "is-red" : ""
            }`}
        ></div>
    );
};

const GameBoard = ({ board, handleMove }: GameBoardProps) => {
    return (
        <>
            {board.map((row: number[], rowIndex: number) => {
                return <Row row={row} handleMove={handleMove} key={rowIndex} />;
            })}
        </>
    );
};

export default GameBoard;
