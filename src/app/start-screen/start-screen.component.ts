import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { doc, setDoc, getDoc, onSnapshot } from '@firebase/firestore';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public firestore: Firestore,
  ) { }

  ngOnInit(): void {
  }

  newGame() {
    //Start game 
    this.router.navigateByUrl('/game/1iZmpjJGFq3O0kB5CyGe');
    this.route.params.subscribe((params) => {
      // console.log(JSON.stringify(params['id']));

      //Daten für eine bestimmte ID abfragen
      const paramAsString = JSON.stringify(params['id'])
      this.getData(paramAsString);
    })
  }

  async getData(paramAsString) {
    const docRef = doc(this.firestore, 'games', paramAsString);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

}
