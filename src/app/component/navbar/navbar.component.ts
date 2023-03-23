import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  audio: HTMLAudioElement = new Audio();

  constructor() {
    this.audio.src = "assets/audio/car/VincentToetToet.mp4";
    this.audio.load();
  }

  playSound(): void {
    this.audio.play();
  }
}
