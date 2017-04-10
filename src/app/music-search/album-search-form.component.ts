import { Component, OnInit } from '@angular/core';
import { MusicSearchService } from './music-search.service'
import { FormGroup, FormControl } from '@angular/forms'

@Component({
  selector: 'album-search-form',
  template: `
    <form [formGroup]="searchForm">
      <div class="input-group">
        <input type="text" formControlName="query" class="form-control" placeholder="Słowa kluczowe">
      </div>
    </form>
  `,
  styles: []
})
export class AlbumSearchFormComponent implements OnInit {

  searchForm:FormGroup

  constructor(private musicSearch: MusicSearchService) { 
    this.searchForm = new FormGroup({
      'query': new FormControl('Batman')
    })

    this.searchForm.get('query').valueChanges
    .filter(query => query.length >= 3 )
    .distinctUntilChanged()
    .debounceTime(400)
    .subscribe(query => {
        this.musicSearch.search(query)
    })
  }

  search(query){
     this.musicSearch.search(query)
  }

  ngOnInit() {
  }

}
