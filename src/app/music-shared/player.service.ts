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
  	if(track.preview_url === this.url)
  		return;

  	this.url=track.preview_url;
  	this.urlStream.next(track.preview_url);

  }	
}
