let readline = require("readline-sync");

class Square {
  static UNUSED_SQUARE = " ";
  static HUMAN_MARKER = "X";
  static COMPUTER_MARKER = "O";

  constructor(marker = Square.UNUSED_SQUARE) {
    this.marker = marker;
  }

  toString() {
    return this.marker;
  }

  setMarker(marker) {
    this.marker = marker;
  }

  isUnused() {
    return this.marker === Square.UNUSED_SQUARE;
  }

  getMarker() {
    return this.marker;
  }
}

class Board {
  constructor() {
    this.squares = {};
    for (let counter = 1; counter <= 9; ++counter) {
      this.squares[String(counter)] = new Square();
    }
  }

  display() {
    console.log("");
    console.log("     |     |");
    console.log(`  ${this.squares["1"]}  |  ${this.squares["2"]}  |  ${this.squares["3"]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares["4"]}  |  ${this.squares["5"]}  |  ${this.squares["6"]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares["7"]}  |  ${this.squares["8"]}  |  ${this.squares["9"]}`);
    console.log("     |     |");
    console.log("");
  }

  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker);
  }

  unusedSquares() {
    let keys = Object.keys(this.squares);
    return keys.filter(key => this.squares[key].isUnused());
  }

  isFull() {
    return this.unusedSquares().length === 0;
  }

  countMarkersFor(player, keys) {
    let markers = keys.filter(key => {
      return this.squares[key].getMarker() === player.marker;
    });
    return markers.length;
  }

  displayWithClear() {
    console.clear();
    console.log();
    console.log();
    this.display();
  }
}

class Player {
  constructor(marker) {
    this.marker = marker;
  }

  getMarker() {
    return this.marker;
  }
}

class Human extends Player {
  constructor() {
    super(Square.HUMAN_MARKER);
  }
}

class Computer extends Player {
  constructor() {
    super(Square.COMPUTER_MARKER);
  }
}

class TTTGame {
  static POSSIBLE_WINNING_ROWS = [
    ["1", "2", "3"],            // top row of board
    ["4", "5", "6"],            // center row of board
    ["7", "8", "9"],            // bottom row of board
    ["1", "4", "7"],            // left column of board
    ["2", "5", "8"],            // middle column of board
    ["3", "6", "9"],            // right column of board
    ["1", "5", "9"],            // diagonal: top-left to bottom-right
    ["3", "5", "7"],            // diagonal: bottom-left to top-right
  ];

  static joinOr(arr, separator = ", ", word = "or") {
    if (arr.length === 1) {
      return arr[0];
    } else if (arr.length === 2) {
      return arr.join(` ${word} `)
    } else if (arr.length >= 3) {
      return arr.slice(0, arr.length - 1)
        .join(separator) + `${separator}${word} ${arr[arr.length - 1]}`;
    }
  }

  constructor() {
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
  }

  play() {
    this.displayWelcomeMessage();

    while (true) {
      this.playOneRound();
      if (this.playAgain() === "n") break;

      console.clear();
      this.board = new Board(); // check if this is a good way to reset board
    }

    this.displayGoodbyeMessage();
  }

  playOneRound() {
    this.board.display();

    while (true) {
      this.humanMoves();
      if (this.gameOver()) break;

      this.computerMoves();
      if (this.gameOver()) break;

      this.board.displayWithClear();
    }

    this.board.displayWithClear();
    this.displayResults();
  }

  displayWelcomeMessage() {
    console.clear();
    console.log("Welcome to Tic Tac Toe!");
    console.log("");
  }

  displayGoodbyeMessage() {
    console.clear();
    console.log("Thanks for playing Tic Tac Toe! Goodbye!");
  }

  displayResults() {
    if (this.isWinner(this.human)) {
      console.log("You won! Congratulations!");
    } else if (this.isWinner(this.computer)) {
      console.log("Computer won! Better luck next time.");
    } else {
      console.log("A tie game. How boring.");
    }
  }

  humanMoves() {
    let choice;

    while (true) {
      let validChoices = this.board.unusedSquares();
      const prompt = `Choose a square => ${TTTGame.joinOr(validChoices)}: `;
      choice = readline.question(prompt);

      if (validChoices.includes(choice)) break;

      console.log("Sorry, that's not a valid choice.");
      console.log("");
    }

    this.board.markSquareAt(choice, this.human.getMarker());
  }

  computerMoves() {
    let choice = this.computerOffense() || this.computerDefense() || this.pickSquareFive() || this.randomMove();

    this.board.markSquareAt(choice, this.computer.getMarker());
  }

  computerDefense() {
    return this.findWinningSquare(this.human);
  }

  computerOffense() {
    return this.findWinningSquare(this.computer);
  }

  findWinningSquare(player) {
    for (let index = 0; index < TTTGame.POSSIBLE_WINNING_ROWS.length; index += 1) {
      let winningRow = TTTGame.POSSIBLE_WINNING_ROWS[index];
      if ((this.twoSquaresTaken(player, winningRow)) && (this.thirdSquareEmpty(winningRow))) {
        let thirdSquare = winningRow[this.findThirdSquare(winningRow)];
        return thirdSquare;
      }
    }
    return null;
  }

  twoSquaresTaken(player, row) {
    return this.board.countMarkersFor(player, row) === 2;
  }

  thirdSquareEmpty(row) {
    return row.some(key => this.board.squares[key].isUnused());
  }

  findThirdSquare(row) {
    return row.findIndex(marker => this.board.squares[marker].isUnused());
  }

  pickSquareFive() {
    return this.board.squares["5"].isUnused() ? "5" : null;
  }

  randomMove() {
    let validChoices = this.board.unusedSquares();
    let choice;

    do {
      choice = Math.floor((9 * Math.random()) + 1).toString();
    } while (!validChoices.includes(choice));
    return choice;
  }

  gameOver() {
    return this.board.isFull() || this.someoneWon();
  }

  someoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  }

  isWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkersFor(player, row) === 3;
    });
  }

  playAgain() {
    let answer;

    while (true) {
      answer = readline.question("Do you want to play again? Enter y/n: ").toLowerCase();
      if (answer === "y" || answer === "n") break;
      console.log(`Input invalid. Enter "y" or "n".`);
    }
    return answer;
  }
}

let game = new TTTGame();
game.play();


/*

randomMove() {
    let validChoices = this.board.unusedSquares();
    let choice;

    do {
      choice = Math.floor((9 * Math.random()) + 1).toString();
    } while (!validChoices.includes(choice));
    return choice;
  }

  computerDefense() {
    let thirdSquare;

    for (let index = 0; index < TTTGame.POSSIBLE_WINNING_ROWS.length; index += 1) {
      let winningRow = TTTGame.POSSIBLE_WINNING_ROWS[index];
      thirdSquare = this.findTwoSquares(winningRow);
      if (thirdSquare) break;
    }
    console.log(thirdSquare);
    let wait = readline.question("waiting");

    return thirdSquare;
  }

  findTwoSquares(row) {
    console.log(row);

    let humanMarkersRow = row.map(value => {
      let marker = Object.values(this.board.squares[value]);
      return marker[0];
    });
    console.log(humanMarkersRow);

    if (humanMarkersRow.filter(value => value === Square.HUMAN_MARKER).length === 2) {
      let square = row.find(marker => (Object.values(this.board.squares[marker]))[0] === Square.UNUSED_SQUARE);
      console.log(square);

      if (square !== undefined) {
        return square;
      }
    }
    return null;
  }

  */