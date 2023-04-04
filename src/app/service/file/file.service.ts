import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  FILE_URL: string = '/api/upload/';

  constructor(private http: HttpClient) { }

  async uploadFile(file: FormData): Promise<any> {
    return this.http.post(this.FILE_URL, file);
  }

  async getFile(filename: string): Promise<any> {
    return this.http.get(this.FILE_URL+filename);
  }
}
