import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistselectorComponent } from './playlistselector.component';

describe('PlaylistselectorComponent', () => {
  let component: PlaylistselectorComponent;
  let fixture: ComponentFixture<PlaylistselectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistselectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistselectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
