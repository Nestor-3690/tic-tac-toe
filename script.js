function Gameboard() {
    const board = []

    for (let i = 0; i < 9; i++) {
        board.push(Square());
    }

    const getBoard = () => {
        let boardVisualize = [];
        for (let i = 0; i < 9; i++) {
            boardVisualize.push(board[i].getValue());
        }
        return boardVisualize;
    };

    const squareChecker = (marker, square) => {
        if (board[square].getValue() !== 0) {
            return false
        }
        board[square].changeValue(marker);
    }

    const gameWon = () => {
        if (board[0].getValue() === board[3].getValue() && board[3].getValue() === board[6].getValue() && board[0].getValue() !== 0 || board[1].getValue() === board[4].getValue() && board[4].getValue() === board[7].getValue() && board[1].getValue() !== 0 || board[2].getValue() === board[5].getValue() && board[5].getValue() === board[8].getValue() && board[2].getValue() !== 0 ||
        board[0].getValue() === board[1].getValue() && board[1].getValue() === board[2].getValue() && board[0].getValue() !== 0 || board[3].getValue() === board[4].getValue() && board[4].getValue() === board[5].getValue() && board[3].getValue() !== 0 || board[6].getValue() === board[7].getValue() && board[7].getValue() === board[8].getValue() && board[6].getValue() !== 0 ||
        board[0].getValue() === board[4].getValue() && board[4].getValue() === board[8].getValue() && board[0].getValue() !== 0 || board[6].getValue() === board[4].getValue() && board[4].getValue() === board[2].getValue() && board[6].getValue() !== 0) {
            return true;
        } else {
            return false;
        }
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

    const players = Players().createPlayers;

    let turn = 1;
    const changeTurn = () => {
        turn = turn === 1 ? 2 : 1;
        console.log(turn);
    }

    const getTurn = () => turn;

    const playRound = (choice, gameboard) => {
         const actualPlayer = getTurn();

         if (gameboard.squareChecker(players[actualPlayer - 1].marker, choice) === false) {
            return false;
         }

         if (gameboard.gameWon() === true) {
            console.log(`${players[actualPlayer - 1].name} won!`);
         } else if (gameboard.gameTie() === true) {
            console.log("The game is a tie!");
         } else {
            changeTurn();
            console.log(gameboard.getBoard());
         }
    }

    return { getTurn, changeTurn, playRound};
}

function DisplayGame() {

    const game = GameController();

    const board = Gameboard();

    const gameboardUI = document.querySelector("#gameboard");

    const printGameboard = () => {
        gameboardUI.textContent = '';
        const gameboard = board.getBoard();
        let count = 0;
        gameboard.forEach((square) => {
            const actualCount = count;
            const squareUI = document.createElement("div");
            squareUI.setAttribute("class", "square");
            squareUI.setAttribute("id", `${actualCount}`);
            squareUI.textContent = square;
            squareUI.addEventListener("click", () => {
                game.playRound(actualCount, board);
                printGameboard();
            });
            gameboardUI.append(squareUI);
            count++;
        })
    }

    printGameboard();

    return { printGameboard };
}

const gameUI = DisplayGame();