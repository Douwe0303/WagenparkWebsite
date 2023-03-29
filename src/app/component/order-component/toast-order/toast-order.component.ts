import { Component } from '@angular/core';

@Component({
  selector: 'app-toast-order',
  templateUrl: './toast-order.component.html',
  styleUrls: ['./toast-order.component.css']
})
export class ToastOrderComponent {
  show = false;

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
