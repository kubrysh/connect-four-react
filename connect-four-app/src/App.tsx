import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import {
    resetGame,
    endGame,
    makeMove,
    togglePlayer
} from "./store/actionCreators";
import GameBoard from "./components/GameBoard";
import checkWin from "./utils/checkWin";

const App = () => {
    const board = useSelector((state: GameState) => state.board);
    const gameEnded = useSelector((state: GameState) => state.gameEnded);
    const message = useSelector((state: GameState) => state.message);

    const dispatch = useDispatch();

    const initialRender = useRef(true);

    // Checking for win or draft on each board state update
    useEffect(() => {
        // Preventing checking the result on initial render
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }
        // Checking for a win & handling results & switching player
        if (!gameEnded) {
            const result = checkWin(board);
            if (result) {
                dispatch(endGame({ result: result }));
            } else {
                // Switching player
                dispatch(togglePlayer());
            }
        }
    }, [board, gameEnded, dispatch]);

    const handleResetGame = () => {
        dispatch(resetGame());
    };

    const handleMove = (columnIndex: number) => {
        if (!gameEnded) {
            // Checking if the move is possible to make
            for (let rowIndex = 5; rowIndex >= 0; rowIndex--) {
                if (board[rowIndex][columnIndex] === 0) {
                    // Making move
                    dispatch(
                        makeMove({
                            rowIndex: rowIndex,
                            columnIndex: columnIndex
                        })
                    );
                    return;
                }
            }
        }
    };

    return (
        <div className="app">
            <header>
                <h1>Connect Four Game</h1>
            </header>
            <main>
                <div className="game-info-container">
                    <button onClick={handleResetGame}>New game</button>
                    <p data-testid="game-info">{message}</p>
                </div>
                <div className="game-board" role="grid">
                    <GameBoard board={board} handleMove={handleMove} />
                </div>
            </main>
            <footer>
                <p>By Ihor Kubrysh | {new Date().getFullYear()}</p>
            </footer>
        </div>
    );
};

export default App;
