import React, { useReducer, useEffect, useRef } from "react";
import "./App.css";
import GameBoard from "./components/GameBoard";
import checkWin from "./utils/checkWin";
import copyArray from "./utils/copyArray";

const messages = {
    player1Turn: "First Player's (Yellow) Move!",
    player2Turn: "Second Player's (Red) Move!",
    player1Won: "First Player (Yellow) Won!",
    player2Won: "Second Player (Red) Won!",
    draft: "Draft!"
};

const initialGameState: any = {
    board: Array(6).fill(Array(7).fill(0)), // Creating 6x7 matrix of zeros which will be representing game cells
    currentPlayer: 1,
    gameEnded: false,
    message: messages.player1Turn
};

const gameStateReducer = (gameState: any, action: any) => {
    switch (action.type) {
        case "reset-game":
            return initialGameState;
        case "toggle-player":
            switch (gameState.currentPlayer) {
                case 1:
                    return {
                        ...gameState,
                        currentPlayer: 2,
                        message: messages.player2Turn
                    };
                case 2:
                    return {
                        ...gameState,
                        currentPlayer: 1,
                        message: messages.player1Turn
                    };
                default:
                    return gameState;
            }
        case "end-game":
            switch (action.result) {
                case 1:
                    return {
                        ...gameState,
                        gameEnded: true,
                        message: messages.player1Won
                    };
                case 2:
                    return {
                        ...gameState,
                        gameEnded: true,
                        message: messages.player2Won
                    };
                case "draft":
                    return {
                        ...gameState,
                        gameEnded: true,
                        message: messages.draft
                    };
                default:
                    return gameState;
            }
        case "make-move":
            // Making deep copy of the board
            const boardClone = copyArray(gameState.board);
            for (let i = 5; i >= 0; i--) {
                if (boardClone[i][action.columnIndex] === 0) {
                    boardClone[i][action.columnIndex] = gameState.currentPlayer;
                    return { ...gameState, board: boardClone };
                }
            }
            return gameState;
        default:
            return gameState;
    }
};

const App = () => {
    const [gameState, dispatch] = useReducer(
        gameStateReducer,
        initialGameState
    );

    const initialRender = useRef(true);

    // Checking for win or draft on each board state update
    useEffect(() => {
        // Preventing checking the result on initial render
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }
        // Checking for a win & handling results
        if (!gameState.gameEnded) {
            const result = checkWin(gameState.board);
            if (result) {
                dispatch({ type: "end-game", result: result });
            }
        }
    }, [gameState.board, gameState.gameEnded]);

    const resetGame = () => {
        dispatch({
            type: "reset-game"
        });
    };

    const handleMove = (columnIndex: any) => {
        if (!gameState.gameEnded) {
            // Making move
            dispatch({
                type: "make-move",
                columnIndex: columnIndex
            });

            // Switching player
            dispatch({
                type: "toggle-player"
            });
        }
    };

    return (
        <div className="app">
            <header>
                <h1>Connect Four Game</h1>
            </header>
            <main>
                <div className="game-info-container">
                    <button onClick={resetGame}>New game</button>
                    <p>{gameState.message}</p>
                </div>
                <div className="game-board">
                    <GameBoard
                        board={gameState.board}
                        handleMove={handleMove}
                    />
                </div>
            </main>
            <footer>
                <p>By Ihor Kubrysh | {new Date().getFullYear()}</p>
            </footer>
        </div>
    );
};

export default App;
