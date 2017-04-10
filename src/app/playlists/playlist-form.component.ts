import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaylistsService, Playlist } from './playlists.service'

@Component({
  selector: 'playlist-form',
  template: `
        <div *ngIf="playlist">
          <formfeedback [ref]="formRef"></formfeedback>
          <form #formRef="ngForm" novalidate="true" (ngSubmit)="save(formRef.valid, playlist)">
          <div class="form-group">
            <label>Nazwa:</label>
            <input type="text" #nameRef="ngModel" required minlength="3" [(ngModel)]="playlist.name" name="name" class="form-control">
          </div>
          <div class="form-group">
            <label>Opis:</label>
            <textarea #descriptionRef="ngModel" [(ngModel)]="playlist.description" name="description" maxlength="200" class="form-control"></textarea>
          </div>
          <div class="form-group">
            <label> Kategoria: </label>
            <select class="form-control" [(ngModel)]="playlist.category" name="category">
              <option *ngFor="let category of categories" [value]="category">{{category}}</option>
            </select>
          </div>
          <!-- <div class="form-group">
            <label> Kategoria: </label>
            <div *ngFor="let category of categories">
              <label class="form-ckeck-input">
                <input type="radio" [(ngModel)]="playlist.category" name="category" [value]="category"> {{category}} 
              </label>
            </div>
          </div> -->
          <div class="form-group">
            <label>Kolor:</label>
            <input type="color" [(ngModel)]="playlist.color" name="color">
          </div>
          <div class="form-group">
            <label><input type="checkbox" [(ngModel)]="playlist.favourite" name="favourite"> 
            Ulubiona</label>
          </div>
          <div class="form-group">
            <button class="btn btn-success float-right" type="submit">Zapisz</button>
          </div>
          </form>
        </div>
  `,
  styles: [`
    input.ng-dirty.ng-invalid, 
    textarea.ng-dirty.ng-invalid,
    input.ng-touched.ng-invalid, 
    textarea.ng-touched.ng-invalid{
      border: 1px solid red;
    }
  `]
})
export class PlaylistFormComponent implements OnInit {

  categories = [
    'Filmowa','Rockowa','Inne'
  ]

  playlist: Playlist;

  save(valid, playlist) {
    if(!valid){
      return;
    }
    this.playlistsService.savePlaylist(playlist)
    .subscribe( playlist => {
      this.router.navigate(['playlist',playlist.id]);
    })
  }

  constructor(private activeRoute: ActivatedRoute,
    private playlistsService: PlaylistsService,
    private router:Router) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      let id = parseInt(params['id']);
      if (id) {
        this.playlistsService.getPlaylist(id)
            .subscribe( (playlist:Playlist) => {    
              this.playlist = Object.assign({},playlist)
            })
      }else{
        this.playlist = this.playlistsService.createPlaylist()
      }
    })
  }

}
