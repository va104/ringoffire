import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-rules',
  templateUrl: './game-rules.component.html',
  styleUrls: ['./game-rules.component.scss']
})
export class GameRulesComponent implements OnInit, OnChanges {
  cardAction = [
    { 
      title: 'Waterfall', 
      description: 'Everyone has to start drinking at the same time. As soon as player 1 stops drinking, player 2 may stop drinking. Player 3 may stop as soon as player 2 stops drinking, and so on.' 
    },
    { 
      title: 'You', 
      description: 'You decide who drinks' 
    },
    { 
      title: 'Me', 
      description: 'Congrats! Drink a shot!' 
    },
    { 
      title: 'Category', 
      description: 'Come up with a category (e.g. Colors). Each player must enumerate one item from the category.' 
    },
    { 
      title: 'Bust a jive', 
      description: 'Player 1 makes a dance move. Player 2 repeats the dance move and adds a second one. ' 
    },
    { 
      title: 'Chicks', 
      description: 'All girls drink.' 
    },
    { 
      title: 'Heaven', 
      description: 'Put your hands up! The last player drinks!' 
    },
    { 
      title: 'Mate', 
      description: 'Pick a mate. Your mate must always drink when you drink and the other way around.' 
    },
    { 
      title: 'Thumbmaster', 
      description: 'You put your thumb on the table at a chosen time. The last person to put their thumb on the table must drink.' 
    },
    { 
      title: 'Men', 
      description: 'All men drink.' 
    },
    { 
      title: 'Question Master', 
      description: 'If anybody answers a question asked by you, they have to drink. This applies to ANY question.' 
    },
    { 
      title: 'Never have i ever...', 
      description: 'Say something you nnever did. Everyone who did it has to drink.' 
    },
    { 
      title: 'Rule', 
      description: 'Make a rule. Everyone needs to drink when he breaks the rule.' 
    },
  ];

  title = '';
  description = '';
  @Input() card: string;

  constructor() { }

  ngOnInit(): void {
  }
  
  // wenn sich ein Input-Parameter ändert
  // void: gibt nichts zurück
  ngOnChanges() : void {
    if (this.card) {
      let cardNumber = +this.card.split('_')[1];
      this.title = this.cardAction[cardNumber - 1].title;
      this.description = this.cardAction[cardNumber - 1].description;
    }
  }
}
