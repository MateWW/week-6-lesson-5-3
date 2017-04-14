import { Injectable, Inject, Optional } from '@angular/core';
import { Http } from '@angular/http';
import { Subject, Observable } from 'rxjs'
import { PlaylistConnectionService } from './playlist-connection.service'

export interface Playlist{
      id?:number,
      name: string,
      tracks: any[],
      color: string,
      favourite: boolean
}

@Injectable()
export class PlaylistsService {

  server_url = 'http://localhost:3000/playlists/';

  constructor(private http:Http, private playlistConnService: PlaylistConnectionService) { }

  playlists:Playlist[] = [];

  savePlaylist(playlist){
    
    if(playlist.id)
      return this.playlistConnService.savePlaylist(playlist);
    else
      return this.playlistConnService.addPlaylist(playlist);

  }

  addToPlaylist(playlistId, track){

    this.playlistConnService.addToPlaylist( playlistId, track );    
 
  }

  test(){
    let stream = new Subject();
    setTimeout(()=>stream.next("Hello"),3000);
    return stream;    
  }

  createPlaylist():Playlist {

    return {
      name: '',
      tracks: [],
      color: '#FF0000',
      favourite: false
    };

  }

  getPlaylists(){
    return this.playlistConnService.getPlaylists()
              .subscribe( playlists => {
                this.playlists = <Playlist[]>playlists;
                this.playlistsStream$.next(this.playlists)
              })
  }

  playlistsStream$ = new Subject<Playlist[]>();

  getPlaylistsStream(){
    if(!this.playlists.length){
      this.getPlaylists()
    }
    return this.playlistsStream$.startWith(this.playlists)
  }

  getPlaylist(id){
    return this.playlistConnService.getPlaylist(id);
  }

}
