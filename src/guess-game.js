class GuessGame {
  #chances;
  #isOver;
  #secretNumber;
  #hasWon;

  constructor(secretNumber, chances) {
    this.#secretNumber = secretNumber;
    this.#chances = chances;
    this.#isOver = false;
    this.#hasWon = false;
  }

  #isInvalidAttempt() {
    return this.#chances < 0 || this.#isOver;
  }

  consolidateGuess(guess) {
    if (this.#isInvalidAttempt()) return { isOver: true };

    this.#chances--;

    if (guess === this.#secretNumber) {
      [this.#isOver, this.#hasWon] = [true, true];
    }

    const result = {
      isOver: this.#isOver,
      hasWon: this.#hasWon,
      high: false,
      low: false,
    };

    if (this.#chances === 0) {
      result.isOver = true;
      result.secretNumber = this.#secretNumber;
    }

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
