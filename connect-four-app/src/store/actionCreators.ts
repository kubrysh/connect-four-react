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

export const makeMove = (payload: Indexes) => {
    const action: Action = {
        type: actionTypes.MAKE_MOVE,
        payload
    };
    return action;
};

export const togglePlayer = () => {
    const action: Action = {
        type: actionTypes.TOGGLE_PLAYER
    };
    return action;
};
