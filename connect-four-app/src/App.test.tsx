import { render, screen, cleanup, fireEvent } from "./test-utils";
import App from "./App";

afterEach(() => {
    cleanup();
});

// Checking if first player has yellow color assigned
test("First player should be yellow", () => {
    render(<App />);
    const infoElement = screen.getByTestId("game-info");
    expect(infoElement).toBeInTheDocument();
    expect(infoElement).toHaveTextContent("First Player's (Yellow) Move!");
});

// Checking if player switching is implemented correctly
test("After the move current player should be switched", () => {
    render(<App />);
    const cell = screen.getAllByRole("gridcell")[12];
    expect(cell).toBeInTheDocument();
    fireEvent.click(cell);
    const infoElement = screen.getByTestId("game-info");
    expect(infoElement).toBeInTheDocument();
    expect(infoElement).toHaveTextContent("Second Player's (Red) Move!");
});

// Checking correct placement and color of player's coins
test("Player's move should be handled correctly", () => {
    render(<App />);
    const gameBoard = screen.getAllByRole("gridcell");
    // Making two moves
    const cellR2C5 = gameBoard[11];
    expect(cellR2C5).toBeInTheDocument();
    fireEvent.click(cellR2C5);
    fireEvent.click(cellR2C5);
    // Cheking correct placement and colors of coins on the board
    const cellR5C5 = gameBoard[32];
    expect(cellR5C5).toBeInTheDocument();
    expect(cellR5C5.classList.contains("is-red")).toBe(true);
    const cellR6C5 = gameBoard[39];
    expect(cellR6C5).toBeInTheDocument();
    expect(cellR6C5.classList.contains("is-yellow")).toBe(true);
});

// Checking if "new game" button works correctly
test('"New game" button should start new game', () => {
    render(<App />);
    const gameBoard = screen.getAllByRole("gridcell");
    // Making a move
    const cellR2C4 = gameBoard[10];
    fireEvent.click(cellR2C4);
    // Pressing "new game" button
    const newGameButton = screen.getByText(/new game/i);
    fireEvent.click(newGameButton);
    // Checking if gameboard is clean
    const cellR6C4 = gameBoard[38];
    expect(cellR6C4).toBeInTheDocument();
    expect(cellR6C4.classList.contains("is-yellow")).toBe(false);
    // Checking if game info message updated
    const infoElement = screen.getByTestId("game-info");
    expect(infoElement).toBeInTheDocument();
    expect(infoElement).toHaveTextContent("First Player's (Yellow) Move!");
});

// Checking if win message is displayed in case of player1's win
test("Win message should be displayed when first player wins", () => {
    render(<App />);
    const gameBoard = screen.getAllByRole("gridcell");
    // Making moves
    const cellR2C4 = gameBoard[10];
    const cellR2C5 = gameBoard[11];
    for (let i = 0; i < 4; i++) {
        fireEvent.click(cellR2C4);
        if (i < 3) {
            fireEvent.click(cellR2C5);
        }
    }
    // Checking if game info message updated
    const infoElement = screen.getByTestId("game-info");
    expect(infoElement).toBeInTheDocument();
    expect(infoElement).toHaveTextContent("First Player (Yellow) Won!");
});

// Checking if win message is displayed in case of player2's win
test("Win message should be displayed when second player wins", () => {
    render(<App />);
    const gameBoard = screen.getAllByRole("gridcell");
    // Making moves
    const cellR2C4 = gameBoard[10];
    const cellR2C5 = gameBoard[11];
    const cellR2C3 = gameBoard[9];
    for (let i = 0; i < 4; i++) {
        if (i < 3) {
            fireEvent.click(cellR2C4);
        } else {
            fireEvent.click(cellR2C3);
        }
        fireEvent.click(cellR2C5);
    }
    // Checking if game info message updated
    const infoElement = screen.getByTestId("game-info");
    expect(infoElement).toBeInTheDocument();
    expect(infoElement).toHaveTextContent("Second Player (Red) Won!");
});

// Checking if tie message is displayed in case of a tie
test("Tie message should be displayed when tie occurs", () => {
    render(<App />);
    const gameBoard = screen.getAllByRole("gridcell");
    // Making moves
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 14; j += 2) {
            fireEvent.click(gameBoard[j]);
        }
    }
    // Checking if game info message updated
    const infoElement = screen.getByTestId("game-info");
    expect(infoElement).toBeInTheDocument();
    expect(infoElement).toHaveTextContent("Tie!");
});

// Checking if no further moves could be made after game ended in result of win
test("No further moves should be possible to make after a win", () => {
    render(<App />);
    const gameBoard = screen.getAllByRole("gridcell");
    // Making moves for a yellow player to win
    const cellR3C4 = gameBoard[17];
    const cellR3C5 = gameBoard[18];
    for (let i = 0; i < 4; i++) {
        fireEvent.click(cellR3C4);
        if (i < 3) {
            fireEvent.click(cellR3C5);
        }
    }
    // Trying to making yet another move
    fireEvent.click(cellR3C5);
    // Checking if it was implemented
    expect(cellR3C5.classList.contains("is-red")).toBe(false);
});

// Checking if current player does not switch when there is an attempt to make a move in a full column
test("Current player should not be switched when there is an attempt to make a move in a full column", () => {
    render(<App />);
    const gameBoard = screen.getAllByRole("gridcell");
    // Making moves to fill out a column
    const cellR1C1 = gameBoard[0];
    for (let i = 0; i < 6; i++) {
        fireEvent.click(cellR1C1);
    }
    // Checking next player
    const infoElement = screen.getByTestId("game-info");
    expect(infoElement).toBeInTheDocument();
    expect(infoElement).toHaveTextContent("First Player's (Yellow) Move!");
    // Attempting to make yet another move
    fireEvent.click(cellR1C1);
    // Checking again
    expect(infoElement).toHaveTextContent("First Player's (Yellow) Move!");
});
