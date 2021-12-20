import checkWin from "./checkWin";

// Horizontal Win Tests
test("Horizontal win of player1 should return 1", () => {
    expect(
        checkWin([
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 2],
            [0, 0, 0, 0, 0, 0, 2],
            [2, 1, 1, 1, 1, 2, 2],
            [1, 2, 1, 2, 1, 2, 1],
            [2, 1, 2, 1, 2, 1, 2]
        ])
    ).toBe(1);
});

test("Horizontal win of player2 should return 2", () => {
    expect(
        checkWin([
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 1, 0, 0, 1],
            [1, 2, 2, 2, 2, 1, 1],
            [2, 1, 2, 1, 2, 1, 2],
            [1, 2, 1, 2, 1, 2, 1]
        ])
    ).toBe(2);
});

// Vertical Win Tests
test("Vertical win of player1 should return 1", () => {
    expect(
        checkWin([
            [0, 1, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 2],
            [0, 1, 0, 0, 0, 0, 2],
            [2, 1, 0, 1, 1, 2, 2],
            [1, 2, 1, 2, 1, 2, 1],
            [2, 1, 2, 1, 2, 1, 2]
        ])
    ).toBe(1);
});

test("Vertical win of player2 should return 2", () => {
    expect(
        checkWin([
            [0, 2, 0, 0, 0, 0, 0],
            [0, 2, 0, 0, 0, 0, 1],
            [0, 2, 0, 1, 0, 0, 1],
            [1, 2, 0, 2, 2, 1, 1],
            [2, 1, 2, 1, 2, 1, 2],
            [1, 2, 1, 2, 1, 2, 1]
        ])
    ).toBe(2);
});

// LR Diagonal Win Tests
test("LR diagonal win of player1 should return 1", () => {
    expect(
        checkWin([
            [0, 0, 0, 1, 0, 0, 0],
            [0, 0, 1, 2, 0, 0, 2],
            [0, 1, 2, 0, 0, 0, 2],
            [1, 1, 2, 1, 1, 2, 2],
            [1, 2, 1, 2, 1, 2, 1],
            [2, 1, 2, 1, 2, 1, 2]
        ])
    ).toBe(1);
});

test("LR diagonal win of player2 should return 2", () => {
    expect(
        checkWin([
            [0, 0, 0, 2, 0, 0, 0],
            [0, 0, 2, 1, 0, 0, 1],
            [0, 2, 1, 2, 0, 0, 1],
            [2, 2, 1, 1, 2, 1, 1],
            [2, 1, 2, 1, 2, 1, 2],
            [1, 2, 1, 2, 1, 2, 1]
        ])
    ).toBe(2);
});

// RL Diagonal Win Tests
test("RL diagonal win of player1 should return 1", () => {
    expect(
        checkWin([
            [0, 0, 0, 1, 0, 0, 0],
            [1, 1, 1, 2, 0, 0, 2],
            [2, 2, 1, 0, 0, 0, 2],
            [1, 1, 2, 1, 1, 2, 2],
            [1, 2, 1, 1, 1, 2, 1],
            [2, 1, 2, 1, 2, 2, 2]
        ])
    ).toBe(1);
});

test("RL diagonal win of player2 should return 2", () => {
    expect(
        checkWin([
            [0, 0, 0, 0, 0, 0, 0],
            [0, 2, 1, 0, 0, 0, 1],
            [0, 0, 2, 0, 1, 0, 1],
            [2, 2, 1, 2, 2, 1, 1],
            [2, 1, 2, 1, 2, 1, 2],
            [1, 2, 1, 2, 1, 1, 1]
        ])
    ).toBe(2);
});

// Absence of win
test("Absence of any win should return false", () => {
    expect(
        checkWin([
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 2, 2, 1, 1],
            [2, 1, 2, 1, 2, 1, 2],
            [1, 2, 1, 2, 1, 2, 1]
        ])
    ).toBe(false);
});

// Draft
test('In case of no empty cells remaining, the return should be "draft"', () => {
    expect(
        checkWin([
            [2, 2, 1, 1, 2, 2, 1],
            [1, 1, 2, 2, 1, 1, 2],
            [2, 2, 1, 1, 2, 2, 1],
            [1, 1, 2, 2, 1, 1, 2],
            [2, 2, 1, 1, 2, 2, 1],
            [1, 1, 2, 2, 1, 1, 2]
        ])
    ).toBe("draft");
});
