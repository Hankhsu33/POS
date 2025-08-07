const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('static'));

let sharedState = { member: "尚未辨識", items: [], recommendations: [] };

io.on('connection', (socket) => {
  console.log('📡 客戶端已連線');
  socket.emit('sync', sharedState);

  socket.on('update', (data) => {
    sharedState = data;
    io.emit('sync', sharedState);
  });

  socket.on('disconnect', () => {
    console.log('❌ 客戶端離線');
  });
});

http.listen(3000, () => {
  console.log('🚀 Server at http://localhost:3000');
});
