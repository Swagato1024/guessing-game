class GuessGame {
  #chances;
  #isOver;
  #secretNumber;

  constructor(secretNumber, chances) {
    this.#secretNumber = secretNumber;
    this.#chances = chances;
    this.#isOver = false;
  }

  #isGameOver(guess) {
    return this.#chances === 0 || guess === this.#secretNumber;
  }

  consolidateGuess(guess) {
    this.#chances--;

    if (this.#isGameOver(guess)) {
      this.#isOver = true;
    }

    const result = { high: false, low: false, isOver: this.#isOver };

    if (guess > this.#secretNumber) {
      result.high = true;
      return result;
    }

    result.low = true;
    return result;
  }
}

module.exports = {
  GuessGame,
};
