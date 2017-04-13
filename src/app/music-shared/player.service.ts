import { Injectable } from '@angular/core';
import { Subject } from "rxjs"



@Injectable()
export class PlayerService {

  PlayerStatus = {
    PLAYING:0,
    PAUSED:1,
    ENDED:2
  }

  constructor() { }

  url;

  urlStream =  new Subject();

  urlSteramGet(){
  	return this.urlStream.startWith(this.url);
  }


  play(track){
  	this.url=track;
  	this.urlStream.next(track);
  }

  statusStream$ = new Subject();
  status = this.PlayerStatus.ENDED;

  getStatusStream(){
    return this.statusStream$.startWith([this.status,this.url]);
  }

  setStatus(status){
    this.status = status;
    this.statusStream$.next([status,this.url]);
  }


}
