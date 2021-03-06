import { Component, OnInit } from '@angular/core';

declare var document;

@Component({
  selector: 'app-fullscreen-toggle',
  templateUrl: './fullscreen-toggle.component.html',
  styleUrls: ['./fullscreen-toggle.component.scss']
})
export class FullscreenToggleComponent implements OnInit {
  
  fullscreen: boolean;
  d: any;
  enabled: boolean;
  
  constructor() { }

  ngOnInit(): void {
    this.d = document;
    this.fullscreen = false;
    this.enabled = (this.d.documentElement && this.d.documentElement.requestFullscreen) ? true: false;
  }

  requestFullscreen() {
    this.fullscreen = true;
    this.d.documentElement.requestFullscreen();
  }

  exitFullscreen() {
    this.fullscreen = false;
    this.d.exitFullscreen();
  }

}
