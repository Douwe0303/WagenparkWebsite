import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export interface Data<Value> {
  value: Value,
  type: string,
  date?: NgbDateStruct | null,
  formData?: FormData,
  status?: any,
  file?: File,
  path?: string,
  required: boolean,
  toDisplay?: string,
  translation: string
}
