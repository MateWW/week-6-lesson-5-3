import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nav-bar',
  template: `
    <nav class="navbar navbar-light bg-faded">
      <div class="container d-flex justify-content-between">
        <h3>
          <a routerLink="/" class="navbar-brand">Muzyka z Angular2</a>
        </h3>
        <ul class="nav" >
          <li class="nav-item">
            <a class="nav-link" routerLink="/music" routerLinkActive="active"> Szukaj Muzyki </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLink="/playlist" routerLinkActive="active"> Twoje Playlisty </a>
          </li>
        </ul>  
      </div>
    </nav>
  `,
  styles: []
})
export class NavBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
