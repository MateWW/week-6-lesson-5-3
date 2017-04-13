import { Component, OnInit , Input } from '@angular/core';
import { PlayerService } from './player.service'


@Component({
  selector: 'play-pause-button',
  template: `
    <i [ngClass]="{'fa':true, 'fa-play':!isPlaying, 'fa-pause':isPlaying}"></i>
  `,
  styles: [
    `i{
      font-size:1.4em;
      margin-top:auto;
      margin-bottom:auto;
      transition: color .5s;
    }
    .fa-play:hover{
      color:#5cb85c;
    }
    .fa-pause:hover{
      color:#d9534f;
    }`
  ]
})
export class PlayPauseButtonComponent implements OnInit {

  @Input("track")
  trackId

  status=this.playerService.PlayerStatus.ENDED;

  isPlaying=false;

  checkTrack(track , status){
    if(!track)
      return false;
    console.log(this.trackId,track.id,track.name)
    if(track.id!=this.trackId)
    {
      return false;
    }
    else{          
      if(!this.checkStatus(status))
        return false;
      else
        return true;
    }
  }

  checkStatus(status){
    if(status == this.playerService.PlayerStatus.ENDED)
      return false;
    else if(status == this.playerService.PlayerStatus.PAUSED)
      return false;
    else if(status == this.playerService.PlayerStatus.PLAYING)
      return true;
  }

  constructor( private playerService: PlayerService) { }

  ngOnInit() {
    this.playerService.urlSteramGet()
      .subscribe( track => {
        // console.log(this.checkTrack(track),this.checkStatus(this.status))
        if(this.checkTrack(track,this.status))
          this.isPlaying = true;
        else
          this.isPlaying = false;
      });


    this.playerService.getStatusStream()
      .subscribe( (params) => {
        this.status = params[0];
        let track = params[1];
        // console.log(this.checkTrack(track),this.checkStatus(this.status))
       
        if(this.checkTrack(track,this.status))
          this.isPlaying = true;
        else
          this.isPlaying = false;
      });
  }

}
