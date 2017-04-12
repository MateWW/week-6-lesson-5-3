import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { PlaylistselectorComponent } from './playlistselector.component';
import { TrackListComponent } from "./track-list.component"

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
  	PlaylistselectorComponent,
  	TrackListComponent
  ],
  exports: [
  	PlaylistselectorComponent,
  	TrackListComponent
  ]
})
export class MusicSharedModule { }
