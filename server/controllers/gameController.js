// Constructing an object to control the game session.

class GameSession {
  playerOneSocket;
  playerTwoSocket;

  gameState = {
    playerOneName: "",
    playerTwoName: "",
    playerOneScore: 0,
    playerTwoScore: 0,
    ties: 0,
    playerOneTurn: true,
    gameGrid: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  };

  constructor(playerName, playerSocket, joiningCode) {
    this.gameState.playerOneName = playerName;
    this.playerOneSocket = playerSocket;
    this.joiningCode = joiningCode;
  }

  JoinSession = (playerName, playerSocket) => {
    this.gameState.playerTwoName = playerName;
    this.playerTwoSocket = playerSocket;
  };

  BroadCast = (event, data) => {
    this.playerOneSocket.emit(event, data);
    this.playerTwoSocket.emit(event, data);
  };

  PlayerMove = (index, value) => {
    this.gameState.gameGrid[index] = value;
    this.gameState.playerOneTurn = !this.gameState.playerOneTurn;
  };

  GamePlay = () => {
    const grid = this.gameState.gameGrid;

    if (grid[0] === grid[1] && grid[1] === grid[2]) {
      if (grid[0] === 1) {
        this.gameState.playerOneScore += 1;
        this.gameState.gameGrid = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.gameState.playerOneTurn = false;
        return "playerOne";
      } else if (grid[0] === -1) {
        this.gameState.playerTwoScore += 1;
        this.gameState.gameGrid = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.gameState.playerOneTurn = true;
        return "playerTwo";
      }
    }

    if (grid[3] === grid[4] && grid[4] === grid[5]) {
      if (grid[3] === 1) {
        this.gameState.playerOneScore += 1;
        this.gameState.gameGrid = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.gameState.playerOneTurn = false;
        return "playerOne";
      } else if (grid[3] === -1) {
        this.gameState.playerTwoScore += 1;
        this.gameState.gameGrid = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.gameState.playerOneTurn = true;
        return "playerTwo";
      }
    }

    if (grid[6] === grid[7] && grid[7] === grid[8]) {
      if (grid[6] === 1) {
        this.gameState.playerOneScore += 1;
        this.gameState.gameGrid = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.gameState.playerOneTurn = false;
        return "playerOne";
      } else if (grid[6] === -1) {
        this.gameState.playerTwoScore += 1;
        this.gameState.gameGrid = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.gameState.playerOneTurn = true;
        return "playerTwo";
      }
    }

    // Winning by vertical lines
    for (let j = 0; j < 3; j++) {
      if (
        grid[j] === grid[j + 3] &&
        grid[j + 3] === grid[j + 6] &&
        grid[j] === grid[j + 6]
      ) {
        if (grid[j] === 1) {
          this.gameState.playerOneScore += 1;
          this.gameState.gameGrid = [0, 0, 0, 0, 0, 0, 0, 0, 0];
          this.gameState.playerOneTurn = false;
          return "playerOne";
        } else if (grid[j] === -1) {
          this.gameState.playerTwoScore += 1;
          this.gameState.gameGrid = [0, 0, 0, 0, 0, 0, 0, 0, 0];
          this.gameState.playerOneTurn = true;
          return "playerTwo";
        }
      }
    }

    // Winning by diagonals
    if (grid[0] === grid[4] && grid[4] === grid[8]) {
      if (grid[0] === 1) {
        this.gameState.playerOneScore += 1;
        this.gameState.gameGrid = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.gameState.playerOneTurn = false;
        return "playerOne";
      } else if (grid[0] === -1) {
        this.gameState.playerTwoScore += 1;
        this.gameState.gameGrid = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.gameState.playerOneTurn = true;
        return "playerTwo";
      }
    } else if (grid[2] === grid[4] && grid[4] === grid[6]) {
      if (grid[2] === 1) {
        this.gameState.playerOneScore += 1;
        this.gameState.gameGrid = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.gameState.playerOneTurn = false;
        return "playerOne";
      } else if (grid[2] === -1) {
        this.gameState.playerTwoScore += 1;
        this.gameState.gameGrid = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.gameState.playerOneTurn = true;
        return "playerTwo";
      }
    } else {
      if (this.isFullBoard()) {
        this.gameState.ties += 1;
        this.gameState.gameGrid = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.gameState.playerOneTurn = !this.gameState.playerOneTurn;
        return "tie";
      }
    }

    return "ongoing";
  };

  isFullBoard = () => {
    for (let i = 0; i < 9; i++) {
      if (this.gameState.gameGrid[i] === 0) {
        return false;
      }
    }

    return true;
  };
}

export default GameSession;
