import { Injectable } from '@angular/core';
import { Subject } from "rxjs"

@Injectable()
export class PlayerService {

  constructor() { }

  url;

  urlStream =  new Subject();

  urlSteramGet(){
  	return this.urlStream.startWith(this.url);
  }


  play(track){
  	this.url=track.preview_url;
  	this.urlStream.next(track.preview_url);

  }	
}
