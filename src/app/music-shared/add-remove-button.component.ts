import { Component, OnInit , Input } from '@angular/core';

@Component({
  selector: 'add-remove-button',
  template: `
    <i class="fa fa-play"></i> <i [ngClass]="{'fa':true, 'fa-plus':!onList, 'fa-minus':onList}"></i>
  `,
  styles: []
})
export class AddRemoveButtonComponent implements OnInit {

  @Input("track")
  trackId

  onList=false;

  constructor() { }

  ngOnInit() {
  }

}
