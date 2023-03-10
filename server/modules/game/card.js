module.exports = class Card {
  constructor(rank, suit) {
    this.rank = rank;
    this.suit = suit;
    this.point = this.getPoint(rank);
  }

  // Lấy điểm số của lá bài
  getPoint(rank) {
    if (["J", "Q", "K"].includes(rank)) {
      return 10;
    } else if (rank === "A") {
      return 11;
    } else {
      return parseInt(rank);
    }
  }
};
