const net = require("node:net");

const { GuessGame } = require("./src/guess-game");

const generateRandomNumber = () => {
  const random = Math.floor(Math.random() * 1000);
  console.log(random);
  return random;
};

const initiateGame = (server, chances) => {
  server.on("connection", (socket) => {
    const secretNumber = generateRandomNumber();
    const game = new GuessGame(secretNumber, chances);

    socket.on("data", (guess) => {
      const result = game.consolidateGuess(+guess);

      socket.write(JSON.stringify(result), () => {
        if (result.isOver) socket.end();
      });
    });
  });
};

const main = () => {
  const chances = 5;
  const server = net.createServer();

  server.listen(8000, () => {
    console.log("listening");
  });

  initiateGame(server, chances);
};

main();
