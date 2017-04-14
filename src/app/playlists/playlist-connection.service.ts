import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from "rxjs";

export interface Playlist{
	  id?:number,
    name: string,
    tracks: any[],
    color: string,
    favourite: boolean
}
interface Track{
  id?:number,
  tracksId:string[],
  playlistId:number
}

@Injectable()
export class PlaylistConnectionService {

  playlists:Playlist[] = [
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

  playlist_url = "http://localhost:3000/playlists/";
  tracks_url = "http://localhost:3000/tracks/"
  relation = "?_embed=tracks"
  spotifyDownloadLink ='https://api.spotify.com/v1/tracks?ids='

  tempPlaylists = []

  LoadedTracks = []

  playlists$ = new Subject(); 

  savePlaylist(playlist){
  	let playlistId = playlist.id;
  	return this.getPlaylist(playlistId);
  }

  addPlaylist( playlist ){

  	playlist.id = this.playlists.length;
  	this.playlists.push(playlist);

  	return this.savePlaylist( playlist );
  }

  addToPlaylist( playlistId, track ){

  	let playlist = this.playlists.find( playlist => ( playlist.id === parseInt(playlistId)) );

  	console.log( this.tempPlaylists , track );

  	if(!playlist)
      return;

  	let id = playlist.tracks.findIndex(tracki => tracki.id == track.id);
    
    if(playlist.tracks.find(tracki => tracki.id == track.id))
      playlist.tracks.splice(id,1);    
    else
      playlist.tracks.push(track);

  	this.playlists$.next(this.playlists);

  }

  loadTracks(tracks){
    let stream$ = new Subject();

    let forDownload="",
      tracksWithDetail = [];



    tracks[0].tracksId.forEach( val => {

      let track = this.LoadedTracks.find( track => ( track.id === val ))

      if( track )
      {
        tracksWithDetail.push( track );
      }
      else
      {
        forDownload += val + ",";
      }

    });

    if(forDownload.length > 0)
    {
      forDownload = forDownload.slice(0,forDownload.length-1);
      this.http.get(this.spotifyDownloadLink+forDownload)
        .map( response => response.json() )
        .subscribe( dlTracks => {
          tracksWithDetail = tracksWithDetail.concat(dlTracks.tracks);
          this.LoadedTracks = this.LoadedTracks.concat(dlTracks.tracks);
          stream$.next(tracksWithDetail);
        });
    }
    else {
      return stream$.startWith(tracksWithDetail);
    }

    return stream$;
  }

  preparePlaylist(playlist:Playlist){

    let stream$ = new Promise((resolve,reject) =>{

      let playlistCopy = Object.assign({},playlist);    

      this.loadTracks(playlistCopy.tracks)
        .subscribe( tracks => {

          playlistCopy.tracks = <any[]>tracks;
          resolve( playlistCopy );
        });
    });
    return stream$;
  }

  getPlaylist( id ){


  	let playlist$ = new Subject(); 

  	// let playlist = this.playlists.find( playlist => (playlist.id === id) ) || [];
  	// playlist$.next(playlist);

  	this.http.get(this.playlist_url+id+this.relation)
      .map( response => response.json())
      .subscribe( playlist => {
        
        let tempPlaylist = this.tempPlaylists.find( tempplaylist => 
          ( tempplaylist.id === playlist.id )
        );
        
        if(tempPlaylist)
          tempPlaylist = playlist;
        else
          this.tempPlaylists.push(playlist);

        
        this.preparePlaylist(playlist)
          .then(playlist => {
            console.log(playlist);
            playlist$.next(playlist)
            
          });

      });
  	
  	return playlist$;
  }

  

  getPlaylists(){
    this.http.get(this.playlist_url+this.relation)
      .map ( response => response.json())
      .subscribe( playlists => {
        
        this.tempPlaylists = playlists;

        let prePlaylists = [],
          preIndex = 0;

        playlists.forEach( playlist => {
          
          this.preparePlaylist( playlist )
            .then( prePlaylist => {
              prePlaylists.push(prePlaylist);
              preIndex++;
              if(preIndex === playlists.length)
              {
                this.playlists$.next(prePlaylists);
              }
            });

        });
      
      })
  	return this.playlists$;
  }

  constructor(private http : Http) { }


}
