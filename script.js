function Gameboard() {
    const board = []

    for (let i = 0; i < 9; i++) {
        board.push(Square());
    }

    const getBoard = () => board;

    const squareChecker = (marker, square) => {
        if (board[square].getValue() !== 0) {
            return false
        }
        board[square].changeValue(marker);
    }

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

    return { getBoard, squareChecker, gameWon, gameTie };
}

function Square() {
    let value = 0;
    const getValue = () => value;

    const changeValue = (mark) => {
        value = mark;
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

function GameController() {
    const board = Gameboard();

    const players = Players().createPlayers;

    let turn = 1;
    const changeTurn = () => {
        turn = turn === 1 ? 2 : 1;
        console.log(turn);
    }

    const getTurn = () => turn;

    const playRound = (choice) => {
         const actualPlayer = getTurn();

         squareChecker(players[turn - 1].marker, choice);

         if (gameWon() === true) {
            console.log(`${players[turn - 1].name} won!`);
         } else if (gameTie() === true) {
            console.log("The game is a tie!");
         } else {
            changeTurn();
         }
    }

    return { getTurn, changeTurn};
}