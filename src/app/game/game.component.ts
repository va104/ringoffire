import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, collectionData, collection, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { doc, setDoc, getDoc } from '@firebase/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  game: Game;
  item$: Observable<any>;

  constructor(
    public dialog: MatDialog,
    public firestore: Firestore,
    private route: ActivatedRoute
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0)
        this.game.players.push(name);
    });
  }

  ngOnInit(): void {


    this.newGame();
    this.route.params.subscribe((params) => {
      // console.log(JSON.stringify(params['id']));
      // console.log(params['id']);
      // console.log(params);
      const paramAsString = JSON.stringify(params['id'])
      this.getData(paramAsString);
      // this.item$ = collectionData(coll);
      // const docRef = doc(coll, params['id']);



      // this.item$.subscribe((changes) => {
      //   console.log('Game update ', changes)
      // })
    })
  }

  async getData(paramAsString) {
    // const docRef = doc(this.firestore, 'games', JSON.stringify(params['id']));
    console.log(paramAsString);
    const docRef = doc(this.firestore, 'games', paramAsString);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    } 
  }

  
  newGame() {
    this.game = new Game();

    //add data to firestore
    const gamesCollection = collection(this.firestore, 'games');
    setDoc(doc(gamesCollection), this.game.toJson());
    // addDoc(coll, this.game.toJson())
  }

  pickCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop(); //last element returns the last elem of the array and deletes it
      this.pickCardAnimation = true;

      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
        this.game.currentPlayer++;
        this.game.currentPlayer %= this.game.players.length
      }, 1500);
    }
  }
}
