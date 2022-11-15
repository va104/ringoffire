import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, collectionData, collection, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { doc, setDoc, getDoc, onSnapshot } from '@firebase/firestore';
import { ActivatedRoute, Router } from '@angular/router';

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
    private route: ActivatedRoute,
    private router: Router
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

      //Daten für eine bestimmte ID abfragen
      const paramAsString = JSON.stringify(params['id'])
      this.getData(paramAsString);

      //Daten in Echtzeit abrufen 
      const unsub = onSnapshot(doc(this.firestore, 'games', "1iZmpjJGFq3O0kB5CyGe"), (doc: any) => {
        const allData = doc.data();
        this.game.currentPlayer = allData.currentPlayer;
        this.game.playedCards = allData.playedCards;
        this.game.players = allData.players;
        this.game.stack = allData.stack;
      });

      // this.item$ = collectionData(coll);
      // const docRef = doc(coll, params['id']);
      // this.item$.subscribe((changes) => {
      //   console.log('Game update ', changes)
      // })
    })
  }

  async getData(paramAsString) {
    const docRef = doc(this.firestore, 'games', "1iZmpjJGFq3O0kB5CyGe");
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
    // this.router.navigateByUrl('/game/1iZmpjJGFq3O0kB5CyGe')
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
