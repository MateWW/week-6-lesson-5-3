import { Component, OnInit, Inject } from '@angular/core';
import { PlaylistsService } from './playlists.service'

import playlistsData from './playlists.data'

@Component({
  selector: 'playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css'],
  providers:[
    // PlaylistsService,
    // { provide: 'PlaylistsData', useValue: playlistsData },
  ]
})
export class PlaylistsComponent implements OnInit {

  constructor(private playlistsService:PlaylistsService) {

  }

  ngOnInit() {
  
  }

}
