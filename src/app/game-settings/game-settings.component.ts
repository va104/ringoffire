import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-game-settings',
  templateUrl: './game-settings.component.html',
  styleUrls: ['./game-settings.component.scss']
})
export class GameSettingsComponent implements OnInit {
  allBackgroundImages = [
    'cherries_bg.svg',
    'christmas_bg.svg',
    'floral_bg.svg',
    'halloween_bg.svg',
    'neon_bg.svg',
    'stars_bg.svg',
    'thanksgiving_bg.svg',
  ];
  constructor(public dialogRef: MatDialogRef<GameSettingsComponent>) { }

  ngOnInit(): void {
  }

}
