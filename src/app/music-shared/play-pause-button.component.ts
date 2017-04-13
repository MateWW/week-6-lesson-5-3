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

  isPlaying=false;

  constructor( private playerService: PlayerService) { }

  ngOnInit() {
    this.playerService.urlSteramGet()
      .subscribe( track => {
        if(!track)
          return;

        if(track.id!=this.trackId)
          this.isPlaying=false;

        else{          
          if(this.isPlaying==true)
            this.isPlaying=false;
          else
            this.isPlaying=true;
        }
      } );
  }

}
