import { Component, OnInit } from '@angular/core';

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
    }`
  ]
})
export class PlayPauseButtonComponent implements OnInit {

  isPlaying=false;

  constructor() { }

  ngOnInit() {
  }

}
