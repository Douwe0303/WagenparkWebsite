import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appTableData]'
})
export class TableDataDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
