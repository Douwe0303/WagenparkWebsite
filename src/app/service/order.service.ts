import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Order} from "../interface/order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  ORDER_URL: string = '/api/orders/';

  constructor(private http: HttpClient) { }

  async fetchOrders(): Promise<any> {
    return this.http.get(this.ORDER_URL);
  }

  async createOrder(order: Order | null): Promise<any> {
    return this.http.post(this.ORDER_URL, order);
  }

  async deleteOrder(id: number | undefined): Promise<any> {
    return this.http.delete(this.ORDER_URL+id);
  }

  async editOrder(order: Order | null): Promise<any> {
    return this.http.put(this.ORDER_URL+order?.id, order);
  }
}
