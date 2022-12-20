import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {

  constructor(
    private firestore: AngularFirestore, 
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  newGame() {
    const game = new Game();
    this.firestore
      .collection('games')
      // Game Objects needs to be converted into Json-Format
      .add(game.toJson())
      // get the ID of the current Game and route to the new url
      // same like subscribe but .then is just called once
      .then((gameInfo: any) => {
        this.router.navigateByUrl('/game/' + gameInfo.id);
      });
  }

}
