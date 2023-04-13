import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { first } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  FILE_URL: string = '/api/upload/';

  constructor(private http: HttpClient) { }

  async uploadFile(file: FormData): Promise<any> {
    return this.http.post(this.FILE_URL, file);
  }

  async getFileHttp(filename: string, fileType: string): Promise<any> {
    return this.http.get(this.FILE_URL+filename, { responseType: 'blob'}).pipe(first()).subscribe(
      (res: Blob) => {
        let file: Blob = new Blob([res], {type: 'application/' + fileType});
        const fileUrl = URL.createObjectURL(file);
        window.open(fileUrl, '_blank');
      }
    );
  }

  async getFile(filename: string, fileType: string): Promise<any> {
    return this.http.get(this.FILE_URL+filename, { responseType: 'blob'}).pipe(first()).subscribe(
      (res: Blob) => {
        let blob: Blob = new Blob([res], {type: 'application/' + fileType});
        return new File([blob], 'filename');
      }
    );
  }

  downloadFile(fileName: string): any {
    let type: string = fileName.substring(fileName.lastIndexOf('.')+1, fileName.length);
    if(type == 'docx') {
      type = 'vnd.openxmlformats-officedocument.wordprocessingml.document';
    } else if (type == 'doc') {
      type = 'msword';
    }
    this.getFileHttp(fileName, type);
  }
}
