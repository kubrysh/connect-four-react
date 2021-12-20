import * as actionTypes from "./actionTypes";

export const resetGame = () => {
    const action: Action = {
        type: actionTypes.RESET_GAME
    };
    return action;
};

export const endGame = (payload: Result) => {
    const action: Action = {
        type: actionTypes.END_GAME,
        payload
    };
    return action;
};

export const makeMove = (payload: ColumnIndex) => {
    const action: Action = {
        type: actionTypes.MAKE_MOVE,
        payload
    };
    return action;
};
