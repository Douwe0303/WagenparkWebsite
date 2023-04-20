import { SortingType } from "../enum/sorting-type";

export interface Sorting {
  field: string,
  index: number,
  sorting: SortingType
}
