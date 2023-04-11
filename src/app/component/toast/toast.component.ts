import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent {
  show: boolean = false;
  @Input() styleClass: string = "";

  showToast(toastTitle: string, toastId: number | undefined, toastBody: string, color: string): void {
    // @ts-ignore
    let title: HTMLElement = document.getElementById('toastTitle');

    title.innerText = toastTitle;
    title.style.color = color;

    // @ts-ignore
    document.getElementById('toastId').innerText = "ID: " + toastId;

    // @ts-ignore
    document.getElementById('toastBody').innerText = toastBody;

    this.show = true;
  }
}
