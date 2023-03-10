const { Card } = require('./card');

module.exports = class Desk {
  constructor() {
    this.cards = [];
  }

  // Tạo bộ bài
  createDeck() {
    const suits = ['Cơ', 'Rô', 'Chuồn', 'Bích'];
    const ranks = ['3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A', '2'];

    for (let suit of suits) {
      for (let rank of ranks) {
        const card = new Card(rank, suit);
        this.cards.push(card);
      }
    }
  }

  // Trộn bài
  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  // Chia bài cho các người chơi
  deal(numPlayers) {
    const hands = [];
    for (let i = 0; i < numPlayers; i++) {
      hands.push([]);
    }
    let currentPlayer = 0;
    for (let card of this.cards) {
      hands[currentPlayer].push(card);
      currentPlayer++;
      if (currentPlayer === numPlayers) {
        currentPlayer = 0;
      }
    }
    return hands;
  }
}

