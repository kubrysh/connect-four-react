interface GameState {
    board: number[][];
    currentPlayer: number;
    gameEnded: boolean;
    message: string;
}

type Result = {
    result: number | string;
};

type ColumnIndex = {
    columnIndex: number;
};

type Action =
    | { type: "RESET_GAME" }
    | {
          type: "END_GAME";
          payload: Result;
      }
    | {
          type: "MAKE_MOVE";
          payload: ColumnIndex;
      };

type DispatchType = (args: Action) => Action;
