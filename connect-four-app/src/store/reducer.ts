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
                case "draft":
                    return {
                        ...gameState,
                        gameEnded: true,
                        message: messages.draft
                    };
                default:
                    return gameState;
            }
        case actionTypes.MAKE_MOVE:
            // Making deep copy of the board
            const boardClone: GameState["board"] = copyArray(gameState.board);
            // Checking if move is possible and implementing it
            for (let i = 5; i >= 0; i--) {
                if (boardClone[i][action.payload.columnIndex] === 0) {
                    boardClone[i][action.payload.columnIndex] =
                        gameState.currentPlayer;
                    // Switching player
                    const nextPlayer = gameState.currentPlayer === 1 ? 2 : 1;
                    const nextMessage =
                        gameState.currentPlayer === 1
                            ? messages.player2Turn
                            : messages.player1Turn;
                    // Returning state after new move
                    return {
                        ...gameState,
                        board: boardClone,
                        currentPlayer: nextPlayer,
                        message: nextMessage
                    };
                }
            }
            return gameState;
        default:
            return gameState;
    }
};

export default reducer;
