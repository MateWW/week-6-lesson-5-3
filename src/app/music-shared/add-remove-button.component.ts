import { Component, OnInit , Input } from '@angular/core';
import { PlaylistselectionService } from "./playlistselection.service"

@Component({
  selector: 'add-remove-button',
  template: `
    <i [ngClass]="{'fa':true, 'fa-plus':!onList, 'fa-minus':onList}"></i>
  `,
  styles: [
    `i{
      font-size:1.4em;
      margin-top:auto;
      margin-bottom:auto;
      transition: color .5s;
    }
    .fa-plus:hover{
      color:#5cb85c;
    }
    .fa-minus:hover{
      color:#d9534f;
    }
    `
  ]
})
export class AddRemoveButtonComponent implements OnInit {

  @Input("track")
  trackId

  onList=false;

  constructor( private playlistSelectionService:PlaylistselectionService) { }

  ngOnInit() {
    this.playlistSelectionService.getSelectionIdStream()
      .subscribe(()=>this.onList=false)

    this.playlistSelectionService.getIsOnPlaylistStream()
      .subscribe(isOnPlaylist=>{
        if(!isOnPlaylist)
          return;
        for(let track of isOnPlaylist){
          if(track.id==this.trackId)
            this.onList=true;
        }
        

      });
  }

}
