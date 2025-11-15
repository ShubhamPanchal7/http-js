const net = require('net');

const mathReq = "math 9*6+45-0$";
const programReq = "console.log('hello')";

const client = net.createConnection({ port: 5000 }, () => {
  console.log('Connected to server');
  client.write(mathReq);
});

client.on('data', (data) => {
  console.log('Response:', data.toString());
//   client.write('Hello server!');
});

client.on('end', () => {
  console.log('Disconnected from server');
});


