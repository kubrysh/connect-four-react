import copyArray from "../utils/copyArray";
import * as actionTypes from "./actionTypes";
import messages from "../utils/messages";

const initialGameState: GameState = {
    board: Array(6).fill(Array(7).fill(0)), // Creating 6x7 matrix of zeros which will be representing game cells
    currentPlayer: 1,
    gameEnded: false,
    message: messages.player1Turn
};

const reducer = (gameState = initialGameState, action: Action): GameState => {
    switch (action.type) {
        case actionTypes.RESET_GAME:
            return initialGameState;
        case actionTypes.END_GAME:
            switch (action.payload.result) {
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
                case "tie":
                    return {
                        ...gameState,
                        gameEnded: true,
                        message: messages.tie
                    };
                default:
                    return gameState;
            }
        case actionTypes.MAKE_MOVE:
            // Making deep copy of the board
            const boardClone: GameState["board"] = copyArray(gameState.board);
            // Implementing the move
            boardClone[action.payload.rowIndex][action.payload.columnIndex] =
                gameState.currentPlayer;
            // Returning state after new move
            return {
                ...gameState,
                board: boardClone
            };
        case actionTypes.TOGGLE_PLAYER:
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

export default reducer;
