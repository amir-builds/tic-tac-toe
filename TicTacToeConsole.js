//GAMEBOARD

const Gameboard = (function () {
  //hard code board
  let board = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
  const reset = () => {
    //reassign board
    board = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
  };
  const getBoard = () => board.slice();
  const placeMark = (row, col, marker) => {
    //check if cell is not null
    if (board[row][col] !== null) {
      return false;
    } else {
      board[row][col] = marker;
      return true;
    }
  };
  const isBoardFull = () => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === null) {
          return false;
        }
      }
    }
    return true;
  };
  return {
    getBoard,
    placeMark,
    reset,
    isBoardFull,
  };
})();

//PLAYER FACTORY

const Player = (name, marker) => {
  const getName = () => name;
  const getMarker = () => marker;
  return {
    getName,
    getMarker,
  };
};

//GAME CONTROLLER

const GameController = (function () {
  let players = [];
  let currentPlayer;
  let gameOver = false;

  //startGame
  const startGame = (name1, name2) => {
    players = [Player(name1, "X"), Player(name2, "O")];
    currentPlayer = players[0];
    gameOver = false;
    Gameboard.reset();
  };
  //playRound
  const playRound = (row, col) => {
    //if gameOver return false
    if (gameOver) return false;
    //Try place mark, if fail return false
    const placed = Gameboard.placeMark(row, col, currentPlayer.getMarker());
    if (!placed) return false;
    //Check win if yes return winner
    const winner = checkWin();
    if (winner) {
      gameOver = true;
      return winner;
    }
    //Switch player
    currentPlayer =
      currentPlayer === players[0] ? players[1] : players[0];
    return true;
  };
  //checkWin
   const checkLine = (a, b, c) => {
      if (a === b && b === c && a !== null) return a;
      return null;
    };
  const checkWin = () => {
    const board = Gameboard.getBoard();
    //check rows
    //row1
    let result = checkLine(board[0][0], board[0][1], board[0][2]);
    if (result) return result;
    //row2
    result = checkLine(board[1][0], board[1][1], board[1][2]);
    if (result) return result;
    //row3
    result = checkLine(board[2][0], board[2][1], board[2][2]);
    if (result) return result;
    //check columns
    //col1
    result = checkLine(board[0][0], board[1][0], board[2][0]);
    if (result) return result;
    //col2
    result = checkLine(board[0][1], board[1][1], board[2][1]);
    if (result) return result;
    //col3
    result = checkLine(board[0][2], board[1][2], board[2][2]);
    if (result) return result;
    //check diagonals
    //diagonal1
    result = checkLine(board[0][0], board[1][1], board[2][2]);
    if (result) return result;
    //diagonal2
    result = checkLine(board[0][2], board[1][1], board[2][0]);
    if (result) return result;
    return null;
  };
  return {
    startGame,
    playRound,
    checkWin,
  };
})();
