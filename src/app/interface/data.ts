import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export interface Data {
  value: string | number | boolean | undefined,
  type: string,
  date?: NgbDateStruct | null,
  formData?: FormData,
  status?: any,
  required: boolean,
  toDisplay?: string,
  translation: string
}
