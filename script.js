function Gameboard() {
    const board = []

    for (let i = 0; i < 9; i++) {
        board.push(Square());
    }

    const getBoard = board;

    return { getBoard };
}

function Square() {
    let value = 0;
    const getValue = () => value;

    const changeValue = (player) => {
        value = player.marker;
    }

    return { getValue, changeValue };
}

function Players(playerOneName = "Player 1", playerTwoName = "Player 2") {
    const createPlayers = [
        {
            name: playerOneName,
            marker: "X"
        },
        {
            name: playerTwoName,
            marker: "O"
        }
    ];

    return { createPlayers };
}