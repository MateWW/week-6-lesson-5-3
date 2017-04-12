import { Component, OnInit  } from '@angular/core';

import { PlaylistselectionService } from "./playlistselection.service"
import { PlaylistsService } from "../playlists/playlists.service"


@Component({
  selector: 'playlist-selector',
  template: `<div class="input-group">
	  			<label for="" class="col-4 col-form-label">Aktywna Playlista</label>
				<select class="form-control" [ngModel]="selectedId"
					(ngModelChange)="setSelected($event)">
					<option *ngFor="let playlist of playlists" [value]="playlist.id">
						{{playlist.name}}({{playlist.tracks.length}})
					</option>
				</select>
  			</div>`,
  styles: []
})
export class PlaylistselectorComponent implements OnInit {

  selectedId;
  playlists = [];

  
  setSelected(id){
  	this.selectionService.select(id);
  }

  constructor( private selectionService: PlaylistselectionService, private playlistService: PlaylistsService) {}

  ngOnInit() {
  	this.selectionService.getSelectionIdStream()
  		.subscribe( id => {
  			this.selectedId = id;
  		});

  	this.playlistService.getPlaylistsStream()
  		.subscribe( playlists =>{
  			this.playlists=playlists;
  		});
  }

}
