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

  // playlists:Playlist[] = [
  // 	{
  // 	  id: 1,
  //     name: 'Test 1',
  //     tracks: [],
  //     color: '#FF0000',
  //     favourite: false
  //   },
  //   {
  //     id: 2,
  //     name: 'Test 2',
  //     tracks: [],
  //     color: '#FF00FF',
  //     favourite: true
  //   }
  // ];

  playlist_url = "http://localhost:3000/playlists/";
  tracks_url = "http://localhost:3000/tracks/"
  relation = "?_embed=tracks"
  spotifyDownloadLink ='https://api.spotify.com/v1/tracks?ids='

  playlists = []

  LoadedTracks = []

  playlists$ = new Subject(); 

  savePlaylist(playlist){
  	let playlistId = playlist.id;
  	return this.getPlaylist(playlistId);
  }

  addPlaylist( playlist ){

  	playlist.id = this.playlists.length;
  	// this.playlists.push(playlist);

  	return this.savePlaylist( playlist );
  }

  saveTracks(val,playlistId){
    this.http.put(this.tracks_url+val.id,val)
      .subscribe(()=>{
        this.getPlaylist(playlistId);
      });
  }

  newPlaylistTrack(track){
    return this.http.post(this.tracks_url,track)
      .map( response => response.json())
  }

  addToPlaylist( playlistId, track ){

  	let playlist = this.playlists.find( playlist => ( playlist.id === parseInt(playlistId)) );

  	if(!playlist)
      return;
    
    if(!this.LoadedTracks.find(trac=>(trac.id === track.id)))
    {
      this.LoadedTracks.push(track);
    }
    new Promise( ( resolve , reject ) => {
      let id;

      if(!playlist.tracks[0])
        id=-1;
      else
    	  id = playlist.tracks[0].tracksId.indexOf(track.id);
      
      if( id >= 0 ){
        playlist.tracks[0].tracksId.splice(id,1);
        resolve(playlist.tracks[0]);
      }
      else{
        if(playlist.tracks[0]){

          playlist.tracks[0].tracksId.push(track.id);
          resolve(playlist.tracks[0]);

        }
        else{

          playlist.tracks=[{
            "playlistId":playlist.id,
            "tracksId":[track.id]
          }];

          this.newPlaylistTrack(playlist.tracks[0])
            .subscribe(ret=>{
              playlist.tracks[0].id=ret.id;
              reject(playlist.tracks[0])
            });

        }
      }
    }).then(val => this.saveTracks(val,playlist.id),val=> this.getPlaylist(playlistId));

  }

  loadTracks(tracks){
    let stream$ = new Subject();

    let forDownload="",
      tracksWithDetail = [];

    if(!tracks[0])
      return stream$.startWith(tracksWithDetail);

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
        
        let tempPlaylist = this.playlists.find( tempplaylist => 
          ( tempplaylist.id === playlist.id )
        );
        
        if(tempPlaylist)
          tempPlaylist = playlist;
        else
          this.playlists.push(playlist);

        
        this.preparePlaylist(playlist)
          .then(playlist => {
            playlist$.next(playlist);
            this.replacePlaylistsAndSend();
          });

      });
  	
  	return playlist$;
  }

  replacePlaylistsAndSend(  ){

    let prePlaylists = [],
        preIndex = 0,
        playlists = this.playlists;

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
  }

  getPlaylists(){
    this.http.get(this.playlist_url+this.relation)
      .map ( response => response.json())
      .subscribe( playlists => {
        
        this.playlists = playlists;


        this.replacePlaylistsAndSend()
      
      })

  	return this.playlists$;
  }

  constructor(private http : Http) { }


}
