import { Component, OnInit , ElementRef } from '@angular/core';
import { PlayerService } from './player.service'

@Component({
  selector: 'player-component',
  template: `
      <audio #audio controls style="width:100%" 
      (play)="playing()" 
      (pause)="paused()" 
      (ended)="ended()"
      ></audio>
  `,
  styles: []
})
export class PlayerComponentComponent implements OnInit {

  playing(){
    this.playerService.setStatus(0);
  }
  paused(){
    this.playerService.setStatus(1);
  } 
  ended(){
    this.playerService.setStatus(2);
  }

  
  constructor(private audio: ElementRef, private playerService:PlayerService) { }


  playerControl(url){
    let audio = this.audio.nativeElement.children[0];
    if(audio.src == url)
    {
       if(audio.paused)
         audio.play();
       else
         audio.pause();
    }
    else{
      audio.src = url;
      audio.play();
    }
  }

  ngOnInit() {
    this.audio.nativeElement.children[0].volume=0.1;
    this.playerService.urlSteramGet()
      .subscribe(url=>{
        if(url)
          this.playerControl(url.preview_url);
      });
  }

}
