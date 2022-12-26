import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditPlayerData, ProfileImages } from 'src/models/profile-images';

@Component({
  selector: 'app-dialog-add-player',
  templateUrl: './dialog-add-player.component.html',
  styleUrls: ['./dialog-add-player.component.scss']
})
export class DialogAddPlayerComponent implements OnInit {
  allProfileImages = new ProfileImages().allProfileImages;

  constructor(
    public dialogRef: MatDialogRef<DialogAddPlayerComponent>,
    @Inject(MAT_DIALOG_DATA) public editPlayer: EditPlayerData) { }

  ngOnInit(): void {
    this.editPlayer = {
      name: '',
      picture: '1.webp'
    }
  }

  onNoClick() {
    this.dialogRef.close()
  }
}
