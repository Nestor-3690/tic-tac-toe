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
        if (board[square].getValue() !== "") {
            return false
        }
        board[square].changeValue(marker);
    }

    const gameWon = () => {
        if (board[0].getValue() === board[3].getValue() && board[3].getValue() === board[6].getValue() && board[0].getValue() !== "" || board[1].getValue() === board[4].getValue() && board[4].getValue() === board[7].getValue() && board[1].getValue() !== "" || board[2].getValue() === board[5].getValue() && board[5].getValue() === board[8].getValue() && board[2].getValue() !== "" ||
        board[0].getValue() === board[1].getValue() && board[1].getValue() === board[2].getValue() && board[0].getValue() !== "" || board[3].getValue() === board[4].getValue() && board[4].getValue() === board[5].getValue() && board[3].getValue() !== "" || board[6].getValue() === board[7].getValue() && board[7].getValue() === board[8].getValue() && board[6].getValue() !== "" ||
        board[0].getValue() === board[4].getValue() && board[4].getValue() === board[8].getValue() && board[0].getValue() !== "" || board[6].getValue() === board[4].getValue() && board[4].getValue() === board[2].getValue() && board[6].getValue() !== "") {
            return true;
        } else {
            return false;
        }
    }

    const gameTie = () => {
        for (let i = 0; i < 9; i++) {
            if (board[i].getValue() === "") {
                return false;
            }
        } return true;
    }

    return { getBoard, squareChecker, gameWon, gameTie };
}

function Square() {
    let value = "";
    const getValue = () => value;

    const changeValue = (mark) => {
        value = mark;
    }

    return { getValue, changeValue };
}

function Players() {

    const createPlayers = (playerOneName, playerTwoName) => [
        {
            name: playerOneName,
            marker: "X"
        },
        {
            name: playerTwoName,
            marker: "O"
        }
    ];

    return { createPlayers }
}

function GameController(players) {

    const board = Gameboard();
    let turn = 1;
    const changeTurn = () => {
        turn = turn === 1 ? 2 : 1;
        console.log(turn);
    }

    const getTurn = () => turn;

    const player1Score = document.querySelector("#p1scoreUI")
    const player2Score = document.querySelector("#p2scoreUI")
    const results = document.querySelector("#results");

    const playRound = (choice) => {
        if (board.gameWon() === true) {
            return false;
        }
         const actualPlayer = getTurn();

         if (board.squareChecker(players[actualPlayer - 1].marker, choice) === false) {
            return false;
         }

         if (board.gameWon() === true) {
            results.textContent = `${players[actualPlayer - 1].name} won!`;
            if (actualPlayer === 1) {
                player1Score.textContent = Number(player1Score.textContent) + 1;
            } else {
                player2Score.textContent = Number(player2Score.textContent) + 1;
            }
         } else if (board.gameTie() === true) {
            results.textContent = "The game is a tie!";
         } else {
            changeTurn();
            console.log(board.getBoard());
         }
    }

    return { playRound, getBoard: board.getBoard};
}

function DisplayGame() {

    /* const game = GameController(players); */

    const initPlayers = Players();

    const form = document.querySelector("form");
    const player1Name = document.querySelector("#p1nameUI")
    const player2Name = document.querySelector("#p2nameUI")
    const results = document.querySelector("#results");

    const gameboardUI = document.querySelector("#gameboard");

    const setGameStart = () => {
        const startButton = document.querySelector("#start-button");
        const restartButton = document.querySelector("#restart")
        startButton.addEventListener("click", () => {
            const player1 = player1name.value ? player1name.value : "Player 1";
            const player2 = player2name.value ? player2name.value : "Player 2";
            const initializedPlayers = initPlayers.createPlayers(player1, player2);
            console.log(initializedPlayers);
            player1Name.textContent = player1;
            player2Name.textContent = player2;
            const game = GameController(initializedPlayers);
            printGameboard(game, initializedPlayers);
            form.remove();
            restartButton.addEventListener("click", () => {
                results.textContent = "";
                printGameboard(game, initializedPlayers, "restart");
            })
        })
    }

    const printGameboard = (game, players, change) => {
        if (change) {
            game = GameController(players);
        }
        gameboardUI.textContent = '';
        const gameboard = game.getBoard();
        let count = 0;
        gameboard.forEach((square) => {
            const actualCount = count;
            const squareUI = document.createElement("button");
            squareUI.setAttribute("class", "square");
            squareUI.setAttribute("id", `${actualCount}`);
            squareUI.textContent = square;
            squareUI.addEventListener("click", () => {
                game.playRound(actualCount);
                printGameboard(game, players);
            });
            gameboardUI.append(squareUI);
            count++;
        })
    }

    setGameStart();
}

const initialize = DisplayGame();