function Gameboard() {
    const board = []

    for (let i = 0; i < 9; i++) {
        board.push(Square());
    }

    const getBoard = board;

    const gameWon = () => {
        if ((board[0].getValue() === board[3].getValue() === board[6].getValue() && board[0].getValue !== 0) || (board[1].getValue() === board[4].getValue() === board[7].getValue() && board[1].getValue !== 0) || (board[2].getValue() === board[5].getValue() === board[8].getValue() && board[2].getValue !== 0) || 
        (board[0].getValue() === board[1].getValue() === board[2].getValue() && board[1].getValue !== 0) || (board[3].getValue() === board[4].getValue() === board[5].getValue() && board[3].getValue !== 0) || (board[6].getValue() === board[7].getValue() === board[8].getValue() && board[6].getValue !== 0) ||
        (board[0].getValue() === board[4].getValue() === board[8].getValue() && board[0].getValue !== 0) || (board[6].getValue() === board[4].getValue() === board[2].getValue() && board[0].getValue !== 0)) {
            return true;
        } return false;
    }

    const gameTie = () => {
        for (let i = 0; i < 9; i++) {
            if (board[i].getValue() === 0) {
                return false;
            }
        } return true;
    }

    return { getBoard, gameWon, gameTie };
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