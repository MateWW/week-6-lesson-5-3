import { Component, OnInit, Input } from '@angular/core';
import { PlaylistselectionService } from './playlistselection.service';
import { PlayerService } from './player.service'

@Component({
  selector: 'track-list',
  template: `
    <table class="table table-striped">
      <thead>
        <tr>
          <th> # </th>
          <th> Nazwa </th>
          <th> Wykonawca </th>
          <th> Próbka  </th>
          <th> Dodaj  </th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let track of tracks" >
          <td> {{track.track_number}} </td>
          <td> {{track.name}} </td>
          <td> {{track.artists[0].name}} </td>
          <td (click)="play(track)" style="height:100%;"> <play-pause-button [track]="track.id" style="height:100%" class="d-flex justify-content-center"></play-pause-button> </td>
          <td (click)="addToPlaylist(track)" style="height:100%;"> <add-remove-button [track]="track.id" class="d-flex justify-content-center" style="height:100%;"></add-remove-button> </td>
        </tr>
      </tbody>
    </table>
  `,
  styles: []
})
export class TrackListComponent implements OnInit {

  @Input()
  tracks

  play(track){
    this.playerService.play(track);
  }

  addToPlaylist(track){
    this.selectionService.addToPlaylist(track);
  }

  constructor( private playerService:PlayerService, private selectionService: PlaylistselectionService) { }

  ngOnInit() {
  }

}
