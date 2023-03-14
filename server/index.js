const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const UserRouter = require('./modules/user/userRouter');
const RandomUtil = require('./modules/utils/randomUtil');

const app = express();
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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
 app.use(cors());

// Sử dụng thư mục 'public' để chứa các tài nguyên của trang web
app.use(express.static(path.join(__dirname, 'public')));

//-------------------------------------------------------
// Định nghĩa router cho trang chủ
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});
// Định nghĩa router cho trang chủ
app.get('/game', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/game.html'));
});
// Khởi tạo đối tượng từ class UserRouter
const userRouter = new UserRouter();

// Đăng ký Router vào ứng dụng
app.use('/users', userRouter.router);
//-------------------------------------------------------

// Danh sách các phòng đang tồn tại
const rooms = {};

// Socket.io event listener
io.on('connection', (socket) => {
  console.log('A user connected');

  // Người dùng yêu cầu tạo phòng mới
  socket.on('createRoom', (roomName) => {
    // Kiểm tra xem phòng đã tồn tại hay chưa
    if (!rooms[roomName]) {
      // Tạo phòng mới và lưu vào danh sách các phòng
      socket.join(roomName);
      rooms[roomName] = [socket.id];
      console.log(`[${socket.id}] created room ${roomName}`);
      console.log(`[${socket.id}] created room `+ new RandomUtil(10).generate());
      // Gửi thông báo tới người dùng rằng phòng đã được tạo
      socket.emit('roomCreated', roomName + new RandomUtil(10).generate());
    } else {
      // Phòng đã tồn tại, gửi thông báo lỗi tới người dùng
      socket.emit('roomExists', roomName);
    }
  });

  // Gửi danh sách các phòng đang tồn tại về client
  socket.emit('roomList', Object.keys(rooms));

  // Người dùng yêu cầu tham gia vào một phòng đã tồn tại
  socket.on('joinRoom', (roomName) => {
    // Kiểm tra xem phòng đã tồn tại hay chưa
    if (rooms[roomName]) {
      // Tham gia vào phòng và lưu thông tin người dùng vào danh sách
      socket.join(roomName);
      rooms[roomName].push(socket.id);
      console.log(`[${socket.id}] joined room ${roomName}`);
      // Gửi thông báo tới tất cả người dùng trong phòng rằng có người mới tham gia vào
      io.to(roomName).emit('userJoined', socket.id);
    } else {
      // Phòng không tồn tại, gửi thông báo lỗi tới người dùng
      socket.emit('roomNotFound', roomName);
    }
  });

  // Shuffle cards and emit to client
  socket.on('shuffleCards', () => {
    const suits = ['Cơ', 'Rô', 'Chuồn', 'Bích'];
    const ranks = ['3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A', '2'];
    let cards = [];
    console.log('Shuffling Cards ...');
    for (let suit of suits) {
      for (let rank of ranks) {
        cards.push(`${rank}${suit}`);
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

module.exports = app;