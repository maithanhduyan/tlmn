const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Function to shuffle cards
function shuffle(cards) {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}
// Allow all origins
// app.use(cors());

// Route to serve client-side code
// app.use(express.static('public'));
// Sử dụng thư mục 'public' để chứa các tài nguyên của trang web
app.use(express.static(path.join(__dirname, 'public')));

// Định nghĩa router cho trang chủ
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});



// Socket.io event listener
io.on('connection', (socket) => {
  console.log('A user connected');

  // Shuffle cards and emit to client
  socket.on('shuffleCards', () => {
    const suits = ['Cơ', 'Rô', 'Chuồn', 'Bích'];
    const ranks = ['3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A', '2'];
    let cards = [];
    console.log('Shuffling Cards ...');
    for (let suit of suits) {
      for (let rank of ranks) {
        cards.push(`${rank} ${suit}`);
      }
    }
    cards = shuffle(cards);
    socket.emit('cardsShuffled', cards);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start server
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
