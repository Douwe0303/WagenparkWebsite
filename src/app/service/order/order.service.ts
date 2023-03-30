import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { OrderDto } from "../../interface/order-dto";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  ORDER_URL: string = '/api/orders/';

  constructor(private http: HttpClient) { }

  async fetchOrders(): Promise<any> {
    return this.http.get(this.ORDER_URL);
  }

  async fetchOrder(id: number | null): Promise<any> {
    return this.http.get(this.ORDER_URL+id);
  }

  async createOrder(order: OrderDto | null): Promise<any> {
    return this.http.post(this.ORDER_URL, order);
  }

  async deleteOrder(id: number | undefined): Promise<any> {
    return this.http.delete(this.ORDER_URL+id);
  }

  async editOrder(order: OrderDto | null): Promise<any> {
    return this.http.put(this.ORDER_URL+order?.id, order);
  }
}
