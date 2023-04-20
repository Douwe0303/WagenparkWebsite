import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableHeader } from "../../interface/table-header";
import { Sorting } from "../../interface/sorting";
import { SortingType } from "../../enum/sorting-type";

@Component({
  selector: '[app-table-head]',
  templateUrl: './table-head.component.html',
  styleUrls: ['./table-head.component.css']
})
export class TableHeadComponent {

  @Input() headers: TableHeader[] = [];

  @Output() sortingEvent = new EventEmitter<Sorting>();

  public properties: Sorting = {
    field: 'id',
    index: 0,
    sorting: SortingType.ASC
  }

  setIndex(index: number): void {
    this.properties.index = index;
  }

  setSorting(key: string): void {
    let newId: string = 'sorting-'+key;
    let oldId: string = 'sorting-'+this.properties.field;

    // @ts-ignore
    let toSort: HTMLElement = document.getElementById('sorting-'+key);

    if(key != this.properties.field) {
      this.replaceClass(oldId, 'opacity-100', 'opacity-25');
      this.replaceClass(newId, 'opacity-25', 'opacity-100');
    }

    this.properties.field = key;

    if(toSort.classList.contains('rotate-to-180')) {
      this.properties.sorting = SortingType.ASC;
      this.replaceClass(newId, 'rotate-to-180', 'rotate-to-0');
    } else {
      this.properties.sorting = SortingType.DESC;
      this.replaceClass(newId, 'rotate-to-0', 'rotate-to-180');
    }

    this.sortingEvent.emit(this.properties);
  }

  replaceClass(id: string, oldClass: string, newClass: string): void {
    document.getElementById(id)?.classList.replace(oldClass, newClass);
  }
}
