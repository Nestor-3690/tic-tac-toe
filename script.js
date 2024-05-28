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