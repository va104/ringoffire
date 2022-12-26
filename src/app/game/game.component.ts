import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';
import { GameOverComponent } from '../game-over/game-over.component';
import { GameSettingsComponent } from '../game-settings/game-settings.component';
import { EditPlayerData } from 'src/models/profile-images';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  // Game is just declared, not initialized
  game: Game;
  // we need the gameID for updating on firebase
  gameId: string;
  gameOver = false;
  cardStack = [0, 1, 2, 3];
  choosePlayer = false;
  backgroundImage = 'floral_bg.svg';

  constructor(
    public dialog: MatDialog,
    private firestore: AngularFirestore,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.newGame();

    // we need the current route with the new game-ID
    this.route.params.subscribe((params) => {
      this.gameId = params['id'];

      this
        .firestore
        .collection('games')
        // subscribe Data with current ID of the route
        .doc(this.gameId)
        .valueChanges()
        .subscribe((game: any) => {
          this.game.players = game.players;
          this.game.player_images = game.player_images;
          this.game.stack = game.stack;
          this.game.playedCards = game.playedCards;
          this.game.currentPlayer = game.currentPlayer;
          this.game.pickCardAnimation = game.pickCardAnimation;
          this.game.currentCard = game.currentCard;
        });
    });
  }

  openDialogAddPlayer(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((playerInfo: EditPlayerData) => {
      if (playerInfo.name && playerInfo.name.length > 0) {
        this.choosePlayer = true;
        this.game.players.push(playerInfo.name); 
        this.game.player_images.push(playerInfo.picture);
        this.safeGameOnFirebase();
      }
    });
  }

  openDialogGameOver(): void {
    const dialogRef = this.dialog.open(GameOverComponent);

    dialogRef.afterClosed()
      .subscribe((newGame) => {
        if (newGame) {
          this.startNewGame();
        }
      });
  }


  safeGameOnFirebase() {
    this
      .firestore
      .collection('games')
      // Update the game of the current Route
      .doc(this.gameId)
      .update(this.game.toJson())
  }

  newGame() {
    this.game = new Game();
  }

  pickCard() {
    if (!this.choosePlayer) {
      this.openDialogAddPlayer();
      return
    }

    if (this.game.stack.length == 0) {
      this.gameOver = true;
    }

    // card is clickable every 1,5s possible
    else if (!this.game.pickCardAnimation) {
      this.showNextCard();
    }
  }

  showNextCard() {
    this.game.currentCard = this.game.stack.pop(); //last element returns the last elem of the array and deletes it
    this.game.pickCardAnimation = true;

    if (this.game.stack.length <= 3) {
      this.cardStack.pop();
    }

    this.safeGameOnFirebase();

    setTimeout(() => {
      this.game.playedCards.push(this.game.currentCard);
      this.game.pickCardAnimation = false;
      this.game.currentPlayer++;
      this.game.currentPlayer %= this.game.players.length
      this.safeGameOnFirebase();
      if (this.game.stack.length == 0) {
        this.openDialogGameOver();
      }
    }, 1500);
  }


  editPlayer(playerId: number, playerName: string) {
    const dialogRef = this.dialog.open(EditPlayerComponent, {
      data: { name: playerName }
    });
    dialogRef.afterClosed().subscribe((change) => {
      if (change) {
        if (change == 'DELETE') {
          this.game.players.splice(playerId, 1)
          this.game.player_images.splice(playerId, 1)
        } else {
          this.game.player_images[playerId] = change.picture;
          this.game.players[playerId] = change.name
        }
        this.safeGameOnFirebase();
      }
    });
  }

  openDialogChangeSettings() {
    const dialogRef = this.dialog.open(GameSettingsComponent);

    dialogRef.afterClosed().subscribe((background: string) => {
      if (background) {
        this.backgroundImage = background;
      }
    });
  }

  startNewGame() {
    this.game.resetGame();
    this.safeGameOnFirebase();
  }
}
