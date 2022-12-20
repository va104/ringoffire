import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditPlayerData } from '../game/game.component';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit {

  allProfileImages = [
    '1.webp',
    '2.png',
    'monkey.png',
    'pinguin.svg',
    'pinguin2.svg',
    'serious-woman.svg',
    'winkboy.svg',
  ];
  avatarSelected = false;
  @ViewChild('test', {static: true}) test;

  constructor(
    public dialogRef: MatDialogRef<EditPlayerComponent>,
    @Inject(MAT_DIALOG_DATA) public editPlayerName: EditPlayerData,) { }

  ngOnInit(): void {
  }

  changeColor() {
    return this.avatarSelected == true ? '1px solid black' : ''
  }

}
