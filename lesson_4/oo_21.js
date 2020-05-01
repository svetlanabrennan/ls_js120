/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
let readline = require("readline-sync");
let shuffle = require('shuffle-array');

class Card {
  static SUIT = ["Hearts", "Diamonds", "Clubs", "Spades"];
  static RANK = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"];
  static VALUE = {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    Jack: 10,
    Queen: 10,
    King: 10,
    Ace: 11
  };

  constructor(suit, rank, value) {
    this.suit = suit;
    this.rank = rank;
    this.value = value;
  }
}

class Deck {
  constructor() {
    this.cards = [];
    this.initializeDeck();
    this.shuffleDeck();
  }

  initializeDeck() {
    Card.SUIT.forEach(suit => {
      Card.RANK.forEach(rank => {
        let value = Card.VALUE[rank];
        this.cards.push(new Card(suit, rank, value));
      });
    });
  }

  shuffleDeck() {
    shuffle(this.cards);
  }

  dealCard() {
    return this.cards.pop();
  }
}

class Participant {
  constructor() {
    this.hand = [];
    this.handValue = 0;
  }

  hit(card) {
    this.addToHand(card);
    this.calculateHandValue();
  }

  isBusted() {
    return this.handValue > 21;
  }

  addToHand(card) {
    this.hand.push(card);
  }

  calculateHandValue() {
    let values = this.hand.map(val => val.value);
    this.handValue = values.reduce((prev, curr) => prev + curr);

    if ((this.checkForAce()) && (this.handValue > 21)) {
      this.handValue = this.adjustForAce(values)
        .reduce((prev, curr) => prev + curr);
    }
    return this.handValue;
  }

  checkForAce() {
    return this.hand.some(val => val.rank === "Ace");
  }

  adjustForAce(valueArray) {
    let indexOfAce = valueArray.indexOf(11);
    valueArray.splice(indexOfAce, 1, 1);
    return valueArray;
  }

  resetHand() {
    this.hand = [];
  }

  resetHandValue() {
    this.handValue = 0;
  }
}

class Player extends Participant {
  constructor() {
    super();
    this.money = 5;
  }

  noMoney() {
    return this.money === 0;
  }

  doubledMoney() {
    return this.money === 10;
  }

  adjustMoney(winner) {
    if (winner === "Player") {
      this.money += 1;
    } else if (winner === "Dealer") {
      this.money -= 1;
    }
  }
}

class Dealer extends Participant {
  constructor() {
    super();
    this.hiddenCard = true;
  }

  hideCard() {
    return this.hiddenCard === true;
  }

  metMinValue() {
    return this.handValue >= 17;
  }
}

class TwentyOneGame {
  constructor() {
    this.player = new Player();
    this.dealer = new Dealer();
    this.deck = null;
    this.winner = null;
  }

  start() {
    this.displayWelcomeMessage();

    while (true) {
      this.playOneGame();

      if (this.player.noMoney() || this.player.doubledMoney()) break;
      if (!this.playAgain()) break;

      console.clear();
      this.resetAll();
    }
    console.clear();
    this.displayFinalWinner();
    this.displayGoodbyeMessage();
  }

  playOneGame() {
    this.deck = new Deck();
    this.dealTWoCards();
    this.player.calculateHandValue();
    this.displayInitialCards();

    this.playerTurn();

    if (this.player.isBusted()) {
      console.log("");
      console.log("You busted!");
      console.log("");
    } else {
      this.dealerTurn();
      console.log("");
      this.displayFinalHandValue();
    }

    this.determineWinner();
    this.displayWinner();

    this.player.adjustMoney(this.winner);
    this.displayMoney();
  }

  displayWelcomeMessage() {
    console.clear();
    console.log("Welcome to 21!");
    console.log("");
  }

  dealTWoCards() {
    this.player.addToHand(this.deck.dealCard());
    this.player.addToHand(this.deck.dealCard());

    this.dealer.addToHand(this.deck.dealCard());
    this.dealer.addToHand(this.deck.dealCard());
  }

  displayInitialCards() {
    this.displayHand(this.player);
    this.displayCardValue(this.player);
    console.log("");

    if (this.dealer.hideCard()) {
      this.displayOneCard();
    } else {
      this.displayHand(this.dealer);
    }
  }

  displayHand(player) {
    if (player instanceof Player) {
      console.log("Player's Hand: ");
    } else if (player instanceof Dealer) {
      console.log("Dealer's Hand: ");
    }

    player.hand.forEach(card => {
      console.log(`=> ${card.rank} of ${card.suit}`);
    });
  }

  displayOneCard() {
    console.log("Dealer's Hand: ");
    let firstCard = this.dealer.hand[0];

    console.log(`=> ${firstCard.rank} of ${firstCard.suit}`);
    console.log(`=> Unknown card`);
  }

  displayCardValue(hand) {
    console.log(`Hand Value: ${hand.handValue}`);
  }

  playerHits() {
    let answer;
    while (true) {
      answer = readline.question('Do you want to hit or stay? Press "h" => hit or "s" => stay: ').toLowerCase();
      if (answer === "h" || answer === "s") break;
      console.log("Invalid selection. Try again.");
    }
    return answer === "h";
  }

  playerTurn() {
    while (true) {
      if (this.player.isBusted() || !this.playerHits()) break;
      console.clear();

      this.player.hit(this.deck.dealCard());
      this.displayHand(this.player);
      this.displayCardValue(this.player);
    }
    if (!this.player.isBusted()) {
      console.clear();
      console.log("You chose to stay.");
      console.log("");
    }
  }

  dealerTurn() {
    this.dealer.hiddenCard = false;
    console.log("Dealer's turn...");

    while (true) {
      this.displayHand(this.dealer);
      this.dealer.calculateHandValue();
      this.displayCardValue(this.dealer);

      if (this.dealer.isBusted() || this.dealer.metMinValue()) break;

      console.log("");
      console.log("Dealer's hitting...");
      console.log("");

      this.dealer.hit(this.deck.dealCard());
    }

    if (this.dealer.isBusted()) {
      console.log("");
      console.log("Dealer busted!");
    } else {
      console.log("");
      console.log("Dealer is staying.");
    }
  }

  determineWinner() {
    if (this.player.isBusted()) {
      this.winner = "Dealer";
    } else if (!this.player.isBusted() && this.dealer.isBusted()) {
      this.winner = "Player";
    } else if (this.player.handValue < this.dealer.handValue) {
      this.winner = "Dealer";
    } else if (this.player.handValue > this.dealer.handValue) {
      this.winner = "Player";
    } else if (this.player.handValue === this.dealer.handValue) {
      this.winner = null;
    }
  }

  displayWinner() {
    if (this.winner) {
      console.log(`${this.winner} wins!`);
    } else {
      console.log("It's a tie!");
    }
  }

  displayFinalHandValue() {
    console.log(`Your hand value is ${this.player.handValue}`);
    console.log(`Dealer's hand value is ${this.dealer.handValue}`);
    console.log("");
  }

  displayMoney() {
    console.log(`You have ${this.player.money} dollars.`);
    console.log("");
  }

  playAgain() {
    let answer;
    while (true) {
      answer = readline.question("Do you want to play another game? y/n: ").toLowerCase();
      if (answer === "y" || answer === "n") break;
      console.log("Invalid selection. Try again.");
    }
    return answer === "y";
  }

  resetAll() {
    this.player.resetHand();
    this.player.resetHandValue();
    this.dealer.resetHand();
    this.dealer.resetHandValue();
    this.winner = null;
    this.dealer.hiddenCard = true;
  }

  displayFinalWinner() {
    if (this.player.money === 0) {
      console.log("Game over! You have no more money left!");
    } else if (this.player.money === 10) {
      console.log("Congrats! You doubled your money!");
      this.displayMoney();
    }
  }

  displayGoodbyeMessage() {
    console.log("Thanks for playing Twenty-One. Goodbye!");
  }
}

let game = new TwentyOneGame();
game.start();