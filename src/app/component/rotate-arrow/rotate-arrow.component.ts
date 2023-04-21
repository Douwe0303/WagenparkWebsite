import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rotate-arrow',
  templateUrl: './rotate-arrow.component.html',
  styleUrls: ['./rotate-arrow.component.css']
})
export class RotateArrowComponent {
  @Input() id: number = 0;
  @Input() title: string = "";
  @Input() class: string = 'trash-color pointer-hover rotate-to-0';

  up: boolean = false;

  rotateArrow(): void {

    if(this.up) {
      this.class.replace('rotate-to-0', 'rotate-to-180');
      this.title = 'Sluit';
    }
    else {
      this.class.replace('rotate-to-180', 'rotate-to-0');
      this.title = 'Open';
    }
  }
}
