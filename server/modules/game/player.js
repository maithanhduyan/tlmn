
module.exports = class Player {
    constructor(name) {
      this.name = name;
      this.cards = [];
      this.client_hash_seed = '';
    }
  
    receiveCard(card) {
      this.cards.push(card);
    }
  
    getCardCount() {
      return this.cards.length;
    }
  
    showCards() {
      console.log(`${this.name}'s cards:`);
      this.cards.forEach((card) => {
        console.log(`- ${card.face} of ${card.suit}`);
      });
    }
  }
  