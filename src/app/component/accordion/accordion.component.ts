import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css']
})
export class AccordionComponent implements OnInit{
  @Input() action: string = '';
  @Input() title: string | null = '';

  constructor(private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    let title = this.activatedRoute.snapshot.paramMap.get('title');
    if(title) {
      this.title = title;
    }
  }

}
