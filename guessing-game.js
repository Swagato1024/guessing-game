const net = require("node:net");
const guessGame = net.createServer();
const assistant = net.createServer();

const verifyGuess = (socket, guess, correctAns) => {
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

guessGame.on("connection", (socket) => {
  socket.write("Guess a number: ");

  const correctAns = Math.floor(Math.random() * 1000);
  console.log(correctAns);

  let attempts = 0;

  socket.on("data", (guess) => {
    attempts++;
    if (attempts > 5) {
      socket.write("Chances Over ");
      socket.end();
      return;
    }
    verifyGuess(socket, +guess, correctAns);
  });
});

guessGame.listen(8000);