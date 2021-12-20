import { render, screen, cleanup } from "@testing-library/react";
import GameBoard from "./GameBoard";

afterEach(() => {
    cleanup();
});

// Checking if game board is rendered
test("Game board should be rendered", () => {
    const board = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 2],
        [0, 0, 2, 0, 2, 0, 1],
        [2, 1, 1, 1, 1, 2, 2],
        [1, 2, 1, 2, 1, 2, 1],
        [2, 1, 2, 1, 2, 1, 2]
    ];
    render(<GameBoard board={board} handleMove={() => {}} />);
    // Checking if there are 6 rows & they are in the document
    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe(6);
    for (let i = 0; i < 6; i++) {
        expect(rows[i]).toBeInTheDocument();
    }
    // Checking if there are 42 cells & they are in the document
    const cells = screen.getAllByRole("gridcell");
    expect(cells.length).toBe(42);
    for (let i = 0; i < 42; i++) {
        expect(cells[i]).toBeInTheDocument();
    }
});

// Checking if player's moves are displayed correcty in terms of color
test("Game board should render occupied cells correctly", () => {
    const board = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 2],
        [0, 0, 2, 0, 2, 0, 1],
        [2, 1, 1, 1, 1, 2, 2],
        [1, 2, 1, 2, 1, 2, 1],
        [2, 1, 2, 1, 2, 1, 2]
    ];
    render(<GameBoard board={board} handleMove={() => {}} />);
    // Checking if color of the cells occupied by players is correct
    const gameBoardCells = screen.getAllByRole("gridcell");
    expect(gameBoardCells[38].classList.contains("is-yellow")).toBe(true);
    expect(gameBoardCells[16].classList.contains("is-red")).toBe(true);
});
