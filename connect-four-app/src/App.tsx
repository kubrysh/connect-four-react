import React, { useReducer, useEffect, useRef } from "react";
import "./App.css";
import GameBoard from "./components/GameBoard";
import checkWin from "./utils/checkWin";
import copyArray from "./utils/copyArray";

interface GameState {
    board: number[][];
    currentPlayer: number;
    gameEnded: boolean;
    message: string;
}

type Action =
    | { type: "reset-game" }
    | { type: "end-game"; result: number | string }
    | { type: "make-move"; rowIndex: number; columnIndex: number }
    | { type: "toggle-player" };

const messages = {
    player1Turn: "First Player's (Yellow) Move!",
    player2Turn: "Second Player's (Red) Move!",
    player1Won: "First Player (Yellow) Won!",
    player2Won: "Second Player (Red) Won!",
    draft: "Draft!"
};

const initialGameState: GameState = {
    board: Array(6).fill(Array(7).fill(0)), // Creating 6x7 matrix of zeros which will be representing game cells
    currentPlayer: 1,
    gameEnded: false,
    message: messages.player1Turn
};

const gameStateReducer = (gameState: GameState, action: Action) => {
    switch (action.type) {
        case "reset-game":
            return initialGameState;
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
            const boardClone: GameState["board"] = copyArray(gameState.board);
            // Implementing the move
            boardClone[action.rowIndex][action.columnIndex] =
                gameState.currentPlayer;
            // Returning state after new move
            return {
                ...gameState,
                board: boardClone
            };
        case "toggle-player":
            // Switching player
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

    const handleResetGame = () => {
        dispatch({
            type: "reset-game"
        });
    };

    const handleMove = (columnIndex: number) => {
        if (!gameState.gameEnded) {
            // Checking if the move is possible to make
            for (let rowIndex = 5; rowIndex >= 0; rowIndex--) {
                if (gameState.board[rowIndex][columnIndex] === 0) {
                    // Making move
                    dispatch({
                        type: "make-move",
                        rowIndex: rowIndex,
                        columnIndex: columnIndex
                    });
                    // Switching player
                    dispatch({
                        type: "toggle-player"
                    });
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
                    <p data-testid="game-info">{gameState.message}</p>
                </div>
                <div className="game-board" role="grid">
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
