import {Component, Input, OnInit} from '@angular/core';
import { TableDataComponent } from "../../../../interface/table-data";
import {EventService} from "../../../../service/event/event.service";

@Component({
  selector: 'app-rotate-arrow',
  templateUrl: './rotate-arrow.component.html',
  styleUrls: ['./rotate-arrow.component.css']
})
export class RotateArrowComponent implements TableDataComponent, OnInit {
  @Input() data: any = {
    rotateArrow: {
      id: 0,
      title: "",
      class: "trash-color pointer-hover rotate-to-0",
    }
  }

  constructor(private _eventService: EventService) {}

  ngOnInit() {
    this._eventService.rotateEvent.subscribe((rotation) => {
      if (rotation.id == this.data.rotateArrow.id && !rotation.rotate) {
        this.rotateArrowDown();
      }
      else if (rotation.id == this.data.rotateArrow.id && rotation.rotate) {
        this.rotateArrowUp();
      }
    });
  }

  rotate: boolean = false;

  rotateArrowUp(): void {
    this.data.rotateArrow.class = this.data.rotateArrow.class.replace('rotate-to-0', 'rotate-to-180');
    this.data.title = 'Sluit';
  }

  rotateArrowDown(): void {
    this.data.rotateArrow.class = this.data.rotateArrow.class.replace('rotate-to-180', 'rotate-to-0');
    this.data.title = 'Open';
  }
}
