const readline = require('readline-sync');

const ROUNDS = 5;

const WIN_CONDITIONS = {
  rock: ["scissors", "lizard"],
  paper: ["rock", "spock"],
  scissors: ["paper", "lizard"],
  lizard: ["spock", "paper"],
  spock: ["scissors", "rock"],
};

function createPlayer() { // object factory
  return {
    move: null,
  };
}

function createHuman() {  // object factory
  let playerObject = createPlayer();

  let humanObject = {
    choose() {
      let choice;

      while (true) {
        console.log("");
        console.log("Please choose rock, paper, scissors, lizard or spock: ");
        choice = readline.question();
        if (["rock", "paper", "scissors", "lizard", "spock"].includes(choice)) break;
        console.log("Sorry, invalid choice.");
      }

      this.move = choice;
    },
  };
  return Object.assign(playerObject, humanObject);
}

function createComputer() {  // object factory
  let playerObject = createPlayer();

  let computerObject = {
    choose() {
      const choices = ["rock", "paper", "scissors", "lizard", "spock"];
      let randomIndex = Math.floor(Math.random() * choices.length);
      this.move = choices[randomIndex];
    },
  };
  return Object.assign(playerObject, computerObject);
}

function keepScore() {  // object factory
  return {
    scoreboard: { human: 0, computer: 0 },

    updateScore(roundWinner) {
      if (roundWinner !== "tie") {
        this.scoreboard[roundWinner] += 1;
      }
    },

    displayScore() {
      console.log(`Current game score => You: ${this.scoreboard.human}, Computer: ${this.scoreboard.computer}`);
    },
  };
}

const RPSGame = { // engine object: procedural program flow
  human: createHuman(),
  computer: createComputer(),
  roundWinner: null,
  score: null,
  gameWinner: null,

  displayWelcomeMessage() {
    console.log("Welcome to Rock, Paper, Scissors, Lizard, Spock!");
    console.log("Win 5 rounds to win the game.");
  },

  displayGoodbyeMessage() {
    console.log("Thanks for playing Rock, Paper, Scissors, Lizard, Spock. Goodbye!");
  },

  displayRoundWinner() { // STOPPED HERE CLEAN THIS UP A BIT
    let humanMove = this.human.move;
    let computerMove = this.computer.move;

    console.log(`You chose: ${this.human.move}`);
    console.log(`The computer chose: ${this.computer.move}`);

    if (WIN_CONDITIONS[humanMove].includes(computerMove)) {
      this.roundWinner = "human";
      console.log('You win!');
    } else if (humanMove === computerMove) {
      this.roundWinner = "tie";
      console.log("It's a tie");
    } else {
      this.roundWinner = "computer";
      console.log('Computer wins!');
    }
  },

  completedRounds() {
    return Object.values(this.score.scoreboard).some(val => val >= ROUNDS);
  },

  determineGameWinner() {
    if (this.score.scoreboard.human === ROUNDS) {
      this.gameWinner = "human";
    } else {
      this.gameWinner = "computer";
    }
  },

  displayGameWinner() {
    if (this.gameWinner === "human") {
      console.log("Congrats! You're the game winner!");
    } else {
      console.log("Computer is the game winner!");
    }
  },

  playOneGame() { // each games is 5 rounds
    while (true) {
      this.human.choose();
      this.computer.choose();
      this.displayRoundWinner();
      this.score.updateScore(this.roundWinner);
      this.score.displayScore();
      if (this.completedRounds()) break;
    }
  },

  playAgain() {
    console.log("Would you like to play again? (y/n) ");
    let answer = readline.question();
    return answer.toLowerCase()[0] === "y";
  },

  play() {
    this.displayWelcomeMessage();
    while (true) {
      this.score = keepScore();
      this.playOneGame();
      this.determineGameWinner();
      this.displayGameWinner();
      if (!this.playAgain()) break;
    }
    this.displayGoodbyeMessage();
  },
};

RPSGame.play();

/*
bonus features:

  3. keep track of history of moves

  4. adjust computer choice based on history

*/


// =========== rps without bonus features

/*

const readline = require('readline-sync');

function createPlayer() { // object factory
  return {
    move: null,
  };
}

function createHuman() {  // object factory
  let playerObject = createPlayer();

  let humanObject = {
    choose() {
      let choice;

      while (true) {
        console.log("Please choose rock, paper, or scissors: ");
        choice = readline.question();
        if (["rock", "paper", "scissors"].includes(choice)) break;
        console.log("Sorry, invalid choice.");
      }

      this.move = choice;
    },
  };
  return Object.assign(playerObject, humanObject);
}

function createComputer() {  // object factory
  let playerObject = createPlayer();

  let computerObject = {
    choose() {
      const choices = ["rock", "paper", "scissors"];
      let randomIndex = Math.floor(Math.random() * choices.length);
      this.move = choices[randomIndex];
    },
  };
  return Object.assign(playerObject, computerObject);
}

// function createMove() {
//   return {
//     // possible state: type of move (paper, rock, scissors)
//   };
// }

// function createRule() {
//   return {
//     // possible state? not clear whether Rules need state
//   };
// }

// // Since we don't yet know where to put `compare`, let's define
// // it as an ordinary function.
// let compare = function (move1, move2) {
//   // not yet implemented
// };

const RPSGame = { // engine object: procedural program flow
  human: createHuman(),
  computer: createComputer(),

  displayWelcomeMessage() {
    console.log("Welcome to Rock, Paper, Scissors!");
  },

  displayGoodbyeMessage() {
    console.log("Thanks for playing Rock, Paper, Scissors. Goodbye!");
  },

  displayWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;

    console.log(`You chose: ${this.human.move}`);
    console.log(`The computer chose: ${this.computer.move}`);

    if ((humanMove === 'rock' && computerMove === 'scissors') ||
      (humanMove === 'paper' && computerMove === 'rock') ||
      (humanMove === 'scissors' && computerMove === 'paper')) {
      console.log('You win!');
    } else if ((humanMove === 'rock' && computerMove === 'paper') ||
      (humanMove === 'paper' && computerMove === 'scissors') ||
      (humanMove === 'scissors' && computerMove === 'rock')) {
      console.log('Computer wins!');
    } else {
      console.log("It's a tie");
    }
  },

  playAgain() {
    console.log("Would you like to play again? (y/n) ");
    let answer = readline.question();
    return answer.toLowerCase()[0] === "y";
  },

  play() {
    this.displayWelcomeMessage();
    while (true) {
      this.human.choose();
      this.computer.choose();
      this.displayWinner();
      // calculate score
      // display score
      if (!this.playAgain()) break;
    }
    this.displayGoodbyeMessage();
  },
};

RPSGame.play();

*/