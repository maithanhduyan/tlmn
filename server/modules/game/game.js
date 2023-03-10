const Desk = require("./desk");

module.exports = class Game {
  constructor() {
    this.desk = new Desk();
    this.players = [];
  }

  shuffleCards() {
    this.desk.shuffleCards();
  }

  dealCards(numCards) {
    return this.desk.dealCards(numCards);
  }

  // other game methods ...
};
