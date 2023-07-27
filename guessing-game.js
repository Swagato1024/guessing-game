const net = require("node:net");
const server = net.createServer();

const verifyGuess = (socket, guess, correctAns, attempts) => {
  if (guess === correctAns) {
    socket.write(`CORRECT GUESS\n`);
    socket.end();
    return;
  }

  let respose = "";

  if (guess > correctAns) respose = "Too High\n";
  else respose = "Loo Low\n";

  socket.write(respose);
};

server.on("connection", (socket) => {
  socket.write("Guess a number: ");

  const correctAns = Math.floor(Math.random() * 1000);
  console.log(correctAns);

  let attempts = 0;

  socket.on("data", (guess) => {
    attempts++;
    verifyGuess(socket, +guess, correctAns, attempts);
  });
});

server.listen(8000);
