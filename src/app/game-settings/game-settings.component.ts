import { Component, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
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

  allDeckCovers = [
    'card_cover_blue.svg',
    'card_cover_blue_2.svg',
    'card_cover_red.svg',
    'card_cover_red_2.svg',
    'abstract.svg',
    'abstract_clouds.svg',
    'astronaut.svg',
    'fish.svg',
    'frog.svg',
  ];
  backgroundSelected = false;
  selectedSettings = {
    background: '',
    deckCover: ''
  }
  @ViewChildren('backgroundImg') backgroundImg: QueryList<any>;
  @ViewChildren('coverImg') coverImg: QueryList<any>;
  
  constructor(
    public dialogRef: MatDialogRef<GameSettingsComponent>,
    private render: Renderer2) { }
  
  ngOnInit(): void {
  }
  
  onBackgroundSelected(background: string, i: number) {
    const toArray = this.backgroundImg.toArray();
    this.deleteAndAddBackground(toArray, i);
    this.selectedSettings.background = background;
  }
  
  onCoverSelected(cover: string, i: number) {
    const toArray = this.coverImg.toArray();
    this.deleteAndAddBackground(toArray, i);
    this.selectedSettings.deckCover = cover;
  }

  deleteAndAddBackground(allImages, i) {
    for (const toElement of allImages) {
      this.render.removeClass(toElement.nativeElement, 'background-active');    
    }
    this.render.addClass(allImages[i].nativeElement, 'background-active');
  }
}
