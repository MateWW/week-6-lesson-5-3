import { Injectable } from '@angular/core';
import { PlaylistsService } from '../playlists/playlists.service';
import { Subject } from "rxjs";


@Injectable()
export class PlaylistselectionService {

  constructor( private playlistService: PlaylistsService) {
  	  	this.playlistService.getPlaylistsStream()
  		.subscribe( playlists =>{
  			if(!this.selectedId)
  				this.select(playlists[0]);
  		});
  }

  selectedId;

  selectedIdStream = new Subject();

  getSelectionIdStream(){
  	return this.selectedIdStream.startWith(this.selectedId);
  }

  select(playlistId){
  	this.selectedId = playlistId;
  	this.selectedIdStream.next(this.selectedId);
  }

  addToPlaylist(track){
  	console.log(this.selectedId);
 	this.playlistService.addToPlaylist(this.selectedId,track);
  }



}
