const net = require('net');

const server = net.createServer((socket) => {
  console.log("Client connected");

  socket.on('data', (data) => {
    console.log('Data:', data.toString());
    socket.write("Message received");
  });

  socket.on('end', () => {
    console.log("Client disconnected");
  });

  socket.on('error', (err) => {
    console.log("Socket error:", err.message);
  });
});

server.on('error', (err) => {
  console.log("Server error:", err.message);
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
