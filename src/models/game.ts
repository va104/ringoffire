export class Game {
  public players: string[] = [];
  public player_images: string[] = [];
  public countCardStack:number[] = [0, 1, 2, 3];
  public stack: string[] = [];
  public playedCards: string[] = [];
  public currentPlayer: number = 0;
  public pickCardAnimation = false;
  public currentCard: string = '';
  public choosePlayer = false;
  public countPlayer = 0;
  

  constructor() {
    for (let i = 1; i < 14; i++) {
      this.stack.push('spades_' + i);
      this.stack.push('hearts_' + i);
      this.stack.push('diamonds_' + i);
      this.stack.push('clubs_' + i);
    }
    this.shuffle(this.stack);
  }

  shuffle(array) {
    let currentIndex = array.length;
    let randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  public toJson() {
    return {
      players: this.players,
      player_images: this.player_images,
      countCardStack: this.countCardStack,
      stack: this.stack,
      playedCards: this.playedCards,
      currentPlayer: this.currentPlayer,
      pickCardAnimation: this.pickCardAnimation,
      currentCard: this.currentCard,
      choosePlayer: this.choosePlayer,
      countPlayer: this.countPlayer,
    }
  }

  resetGame() {
    this.stack = this.playedCards;
    this.shuffle(this.stack);
    this.playedCards = [];
    this.currentCard = '';
    this.currentPlayer = 0;
    this.countCardStack = [0, 1, 2, 3];
  }
}

