import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-game-settings',
  templateUrl: './game-settings.component.html',
  styleUrls: ['./game-settings.component.scss']
})
export class GameSettingsComponent implements OnInit {
  allProfileImages = [
    '1.webp',
    '2.png',
    'monkey.png',
    'pinguin.svg',
    'pinguin2.svg',
    'serious-woman.svg',
    'winkboy.svg',
  ];
  constructor(public dialogRef: MatDialogRef<GameSettingsComponent>) { }

  ngOnInit(): void {
  }

}
