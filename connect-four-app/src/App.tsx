import React, { useState, useEffect } from "react";
import "./App.css";
import GameBoard from "./components/GameBoard";
import { checkWin } from "./utils/checkWin";
import copyArray from "./utils/copyArray";

function App() {

    // Creating 2-D 6x7 array of nulls
    const initialBoard = Array(6).fill(Array(7).fill(0));

    // const initialBoard = [
    //     [null, null, null, null, null, null, null],
    //     [null, null, 2, null, null, null, null],
    //     [null, null, null, null, 1, null, null],
    //     [null, 2, null, null, null, null, null],
    //     [null, null, null, null, null, null, null],
    //     [null, 1, null, null, 1, null, null],
    //   ];

    const [boardState, setBoardState] = useState(initialBoard);
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [gameInProgress, setGameInProgress] = useState(true);

    useEffect(() => {
        // Checking for win
        const result = checkWin(boardState);
        console.log(result);
    }, [boardState])

    const togglePlayer = () => {
        if (currentPlayer === 1) {
            setCurrentPlayer(2);
        } else if (currentPlayer === 2) {
            setCurrentPlayer(1);
        }
    }

    const resetGame = () => {
        setBoardState(initialBoard);
        setCurrentPlayer(1);
        setGameInProgress(true);
    }

    const handleMove = (columnIndex:any) => {

        // Making move
        const boardClone = copyArray(boardState);
        for (let i = 5; i >= 0; i--) {
            if (boardClone[i][columnIndex] === 0) {
                boardClone[i][columnIndex] = currentPlayer;
                setBoardState(boardClone);
                break;
            }
        }

        // Switchng player
        togglePlayer();
    }

    return (
        <div className="app">
            <header>
                <h1>Connect Four Game</h1>
                <button onClick={resetGame}>New game</button>
            </header>
            <main>
                <p>Message</p>
                <div className="game-board">
                    <GameBoard board={boardState} handleMove={handleMove} />
                </div>
            </main>
            <footer>
                <p>By Ihor Kubrysh | {new Date().getFullYear()}</p>
            </footer>
        </div>
    );
}

export default App;
