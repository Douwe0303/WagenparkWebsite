import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { SortingType } from "../enum/sorting-type";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private deleteSource = new Subject<number>();
  deleteEvent = this.deleteSource.asObservable();

  private rotateSource = new Subject<{id: number, rotate: boolean }>();
  rotateEvent = this.rotateSource.asObservable();

  private sortingSource = new Subject<{ index: number, sorting: SortingType }>();
  sortingEvent = this.sortingSource.asObservable();

  private searchSource = new Subject<string>();
  searchEvent = this.searchSource.asObservable();

  emitDelete(id: number) {
    this.deleteSource.next(id);
  }

  emitRotate(id: number, rotate: boolean) {
    this.rotateSource.next({ id: id, rotate: rotate });
  }

  emitSorting(index: number, sorting: SortingType) {
    this.sortingSource.next({index: index, sorting: sorting});
  }

  emitSearch(text: string) {
    this.searchSource.next(text);
  }
}
