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

  playlists:Playlist[] = [ ]

  savePlaylist(playlist){
    let request; 
    if(playlist.id){
      request = this.http.put(this.server_url + playlist.id, playlist)
    }else{
      request = this.http.post(this.server_url, playlist)
    }
      return request.map(response => response.json())
      .do( playlist => {
        this.getPlaylists()
      })
  }

  addToPlaylist(playlistId, track){
    let playlist = this.playlists.find(playlist => playlist.id == playlistId);

    if(!playlist)
      return;

    // Prosta modyfikacja :D
    let id = playlist.tracks.findIndex(tracki => tracki.id == track.id);
    if(playlist.tracks.find(tracki => tracki.id == track.id))
      playlist.tracks.splice(id,1);    
    else
      playlist.tracks.push(track);
    
    this.savePlaylist(playlist)
      .subscribe(()=>{});
  }

  test(){
    let stream = new Subject();
    setTimeout(()=>stream.next("Hello"),3000);
    return stream;    
  }

  createPlaylist():Playlist {
    this.test().subscribe(text=>console.log(text));
    return {
      name: '',
      tracks: [],
      color: '#FF0000',
      favourite: false
    };
  }

  getPlaylists(){
    return this.http.get(this.server_url)
              .map( response => response.json())
              .subscribe( playlists => {
                this.playlists = playlists;
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
    return this.http.get(this.server_url + id)
    .map(response => response.json())
  }

}
