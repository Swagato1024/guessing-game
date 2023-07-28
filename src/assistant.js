const net = require("net");

class Assistant {
  #upperBound;
  #lowerBound;
  #Prevguess;

  constructor(lowerBound, upperBound) {
    this.#lowerBound = lowerBound;
    this.#upperBound = upperBound;
  }

  #makeSuggestion() {
    const range = this.#upperBound - this.#lowerBound;
    return this.#lowerBound + Math.floor(Math.random() * range);
  }

  suggest(hint) {
    let guess;

    if (hint.high) {
      this.#upperBound = this.#Prevguess;
      guess = this.#makeSuggestion();
    } 
    else if (hint.low) {
      this.#lowerBound = this.#Prevguess;
      guess = this.#makeSuggestion();
    }

    this.#Prevguess = guess;
    return guess;
  }

  makeFirstGuess() {
    const guess = this.#makeSuggestion(this.#lowerBound, this.#upperBound);
    this.#Prevguess = guess;
  }
}

const getHint = (respose) => JSON.parse(respose);

const assistant = new Assistant(1, 1024);

const player = net.createConnection({ port: 8000 });

player.on("connect", () => {
  const guess = assistant.makeFirstGuess();
  player.write(`${guess}`);

  player.on("data", (respose) => {
    const hint = getHint(respose);
    console.log(hint);

    if (hint.isOver) return;

    const guess = assistant.suggest(hint);
    player.write(`${guess}`);
  });
});
