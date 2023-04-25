import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ToastComponent} from "../../toast/toast.component";
import {EventService} from "../../../service/event/event.service";

@Component({
  selector: 'app-action-page',
  templateUrl: './action-page.component.html',
  styleUrls: ['./action-page.component.css']
})
export class ActionPageComponent implements OnInit {
  action: string | null = '';
  title: string | null = '';

  @ViewChild(ToastComponent)
  toast: ToastComponent = new ToastComponent();

  constructor(private activatedRoute: ActivatedRoute, private _eventService: EventService) {
    this.title = this.activatedRoute.snapshot.paramMap.get('title');
    this.action = this.activatedRoute.snapshot.paramMap.get('action');
  }

  ngOnInit() {
    this._eventService.updateEvent.subscribe((toastData) => {
      this.toast.showToast(toastData.title.charAt(0).toUpperCase() + toastData.title.slice(1) + ' gewijzigd!', toastData.id, 'De ' + toastData.title + ' is gewijzigd!', '#ffc107');
    })
  }
}
