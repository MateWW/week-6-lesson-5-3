import { Injectable } from '@angular/core';
import { Subject } from "rxjs"

export interface Playlist{
      name: string,
      tracks: any[],
      color: string,
      favourite: boolean
}

@Injectable()
export class PlaylistConnectionService {

  private playlists:Playlist[] = [
  	{
  	  id: 1,
      name: 'Test 1',
      tracks: [],
      color: '#FF0000',
      favourite: false
    },
    {
      id: 2,
      name: 'Test 2',
      tracks: [],
      color: '#FF00FF',
      favourite: true
    }
  ];

  savePlaylist(){
  	return true;
  }

  addPlaylist( playlist ){

  	playlist.id = this.playlists.length;
  	this.playlists.push(playlist);

  }

  addToPlaylist( playlistId, track ){

  	let playlist = this.playlists.find( playlist => ( playlist.id === playlistId ) );

  	playlist.tracks.push(track);

  }

  getPlaylist( id ){

  	let playlist$ = new Subject(); 

  	let playlist = this.playlists.find( playlist => (playlist.id === id) ) || [];
  	// playlist$.next(playlist);
  	return playlist$.startWith(playlist);
  }

  getPlaylists(){

  	let playlist$ = new Subject(); 

  	return playlist$.startWith(this.playlists);
  }

  constructor() { }


}
