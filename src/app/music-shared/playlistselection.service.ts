import { Injectable } from '@angular/core';
import { PlaylistsService } from '../playlists/playlists.service';
import { Subject } from "rxjs";


@Injectable()
export class PlaylistselectionService {

  constructor( private playlistService: PlaylistsService) {
  	  	this.playlistService.getPlaylistsStream()
  		.subscribe( playlists =>{
  			if(!this.selectedId && playlists.length>0)
  				this.select(playlists[0].id);
  		});
  }

  selectedId;

  selectedPlaylist;

  selectedIdStream = new Subject();

  isOnPlayList = new Subject();

  getSelectionIdStream(){
  	return this.selectedIdStream.startWith(this.selectedId);
  }

  select(playlistId){
  	this.selectedId = playlistId;
  	this.selectedIdStream.next(this.selectedId);
    this.getPlaylist();
  }

  addToPlaylist(track){
 	  this.playlistService.addToPlaylist(this.selectedId,track);
  }

  getPlaylist(){
    this.selectedPlaylist =  this.playlistService.getPlaylistsStream()
      .subscribe(playlist =>{
        
        this.selectedPlaylist = playlist.find(playlist=>(playlist.id==this.selectedId));
        this.isOnPlayList.next(this.selectedPlaylist.tracks);
      });
  }

  getIsOnPlaylistStream(){
     return this.isOnPlayList.startWith(this.selectedPlaylist.tracks);
  }


}
