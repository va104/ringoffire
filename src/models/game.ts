export class Game {
    public players: string[] = ['Hans', 'Test', 'Vanessa']; //um in anderen Dateien darauf zuzugreifen
    public stack: string[] = [];
    public playedCards: string[] = [];
    public currentPlayer: number = 0;
    public pickCardAnimation = false;
    public currentCard: string = '';

    constructor() {
        for (let i = 1; i < 14; i++) {
            this.stack.push('spade_'+ i);
            this.stack.push('hearts_'+ i);
            this.stack.push('diamonds_'+ i);
            this.stack.push('clubs_'+ i); 
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
            stack: this.stack,
            playedCards: this.playedCards,
            currentPlayer: this.currentPlayer,
            pickCardAnimation: this.pickCardAnimation,
            currentCard: this.currentCard
          }
      }
}

