import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { PlaylistselectorComponent } from './playlistselector.component';
import { TrackListComponent } from "./track-list.component";
import { PlayerComponentComponent } from './player-component.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
  	PlaylistselectorComponent,
  	TrackListComponent,
  	PlayerComponentComponent
  ],
  exports: [
  	PlaylistselectorComponent,
  	TrackListComponent,
    PlayerComponentComponent
  ]
})
export class MusicSharedModule { }
