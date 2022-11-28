import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: Game;
  gameId: string;

  constructor(
    public dialog: MatDialog,
    private firestore: AngularFirestore,
    private route: ActivatedRoute,) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if(name && name.length > 0)
      this.game.players.push(name);
      this.game.player_images.push('1.webp');
      this.safeGameOnFirebase();
    });
  }
  
  ngOnInit(): void {
    this.newGame();
    
    // get the data of firebase
    this.route.params.subscribe((params) => {
      this.gameId = params['id'];

      this
        .firestore
        .collection('games')
        .doc(this.gameId)
        .valueChanges()
        .subscribe((game: any) => {
          this.game.players = game.players;
          this.game.player_images = game.player_images,
          this.game.stack = game.stack;
          this.game.playedCards = game.playedCards;
          this.game.currentPlayer = game.currentPlayer;
          this.game.pickCardAnimation = game.pickCardAnimation;
          this.game.currentCard = game.currentCard;
        });
    });
  }

 safeGameOnFirebase() {
  this
  .firestore
  .collection('games')
  .doc(this.gameId)
  .update(this.game.toJson())
 }

  newGame() {
    this.game = new Game();
  }
  
  pickCard() {
    if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop(); //last element returns the last elem of the array and deletes it
      this.game.pickCardAnimation = true;
      this.safeGameOnFirebase(); 
      
      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;   
        this.game.currentPlayer++;
        this.game.currentPlayer %= this.game.players.length
        this.safeGameOnFirebase(); 
      }, 1500);
    }
  }

  editPlayer(playerId: number) {
    console.log(playerId);
    const dialogRef = this.dialog.open(EditPlayerComponent);
    dialogRef.afterClosed().subscribe((change: string) => {
      console.log(change);
      this.game.player_images[playerId] = change;
      this.safeGameOnFirebase();
    });
  }
}
