import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditPlayerData, ProfileImages } from 'src/models/profile-images';


@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit {
  allProfileImages = new ProfileImages().allProfileImages;
  avatarSelected = false;

  constructor(
    public dialogRef: MatDialogRef<EditPlayerComponent>,
    @Inject(MAT_DIALOG_DATA) public editPlayerName: EditPlayerData) { }

  ngOnInit(): void { 
  }

}
