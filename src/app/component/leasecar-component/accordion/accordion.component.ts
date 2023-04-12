import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css']
})
export class AccordionComponent {
  @Input() formName: string = "";
  @Input() data: {data:{}}[] = [];
  @Input() component: any;
}