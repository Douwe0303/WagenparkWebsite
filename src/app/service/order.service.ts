import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  ORDER_URL: string = '/api/orders/';

  constructor(private http: HttpClient) { }

  async fetchOrders(): Promise<any> {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
    })
    return this.http.get(this.ORDER_URL, {headers: headers});
  }

  async deleteOrder(id: number): Promise<any> {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
    })
    return this.http.delete(this.ORDER_URL+id, {headers: headers});
  }
}
