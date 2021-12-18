import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import GameBoard from "./components/GameBoard";
import checkWin from "./utils/checkWin";
import copyArray from "./utils/copyArray";

const App = () => {
    // Creating 6x7 matrix of zeros which will be representing game cells
    const initialBoard = Array(6).fill(Array(7).fill(0));

    const [boardState, setBoardState] = useState(initialBoard);
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [gameEnded, setgameEnded] = useState(false);
    const [message, setMessage] = useState("First Player's (Yellow) Move!");

    const initialRender = useRef(true);

    // Checking for win or draft on each board state update
    useEffect(() => {
        // Preventing checking the result on initial render
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }
        // Checking for a win & handling results
        if (!gameEnded) {
            const result = checkWin(boardState);
            if (result) {
                setgameEnded(true);
            }
            switch (result) {
                case 1:
                    setMessage("First Player (Yellow) Won!");
                    break;
                case 2:
                    setMessage("Second Player (Red) Won!");
                    break;
                case "draft":
                    setMessage("Draft!");
                    break;
            }
        }
    }, [boardState, gameEnded]);

    const togglePlayer = () => {
        switch (currentPlayer) {
            case 1:
                setCurrentPlayer(2);
                setMessage("Second Player's (Red) Move!");
                break;
            case 2:
                setCurrentPlayer(1);
                setMessage("First Player's (Yellow) Move!");
                break;
        }
    };

    const resetGame = () => {
        setBoardState(initialBoard);
        setCurrentPlayer(1);
        setgameEnded(false);
        setMessage("First Player's (Yellow) Move!");
    };

    const handleMove = (columnIndex: any) => {
        // Making move
        if (!gameEnded) {
            // Making deep copy of the board
            const boardClone = copyArray(boardState);
            for (let i = 5; i >= 0; i--) {
                if (boardClone[i][columnIndex] === 0) {
                    boardClone[i][columnIndex] = currentPlayer;
                    setBoardState(boardClone);
                    break;
                }
            }

            // Switching player
            togglePlayer();
        }
    };

    return (
        <div className="app">
            <header>
                <h1>Connect Four Game</h1>
            </header>
            <main>
                <div className="game-info-container">
                    <p>{message}</p>
                    <button onClick={resetGame}>New game</button>
                </div>
                <div className="game-board">
                    <GameBoard board={boardState} handleMove={handleMove} />
                </div>
            </main>
            <footer>
                <p>By Ihor Kubrysh | {new Date().getFullYear()}</p>
            </footer>
        </div>
    );
};

export default App;
