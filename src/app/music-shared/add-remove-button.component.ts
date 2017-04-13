import { Component, OnInit , Input } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
