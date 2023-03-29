import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Order } from "../interface/order";
import { OrderStatus } from "../class/order-status";

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

  async createOrder(order: Order | null): Promise<any> {
    return this.http.post(this.ORDER_URL, order);
  }

  async deleteOrder(id: number | undefined): Promise<any> {
    return this.http.delete(this.ORDER_URL+id);
  }

  async editOrder(order: Order | null): Promise<any> {
    return this.http.put(this.ORDER_URL+order?.id, order);
  }

  getOrderStatus(status: string): any {
    switch(status) {
      case OrderStatus.ordered.code:
        return OrderStatus.ordered;

      case OrderStatus.delivered.code:
        return OrderStatus.delivered;

      case OrderStatus.delayed.code:
        return OrderStatus.delayed;

      case OrderStatus.shipped.code:
        return OrderStatus.shipped;

      case OrderStatus.unknown.code:
        return OrderStatus.unknown;

      case OrderStatus.canceled.code:
        return OrderStatus.canceled;

      case OrderStatus.processed.code:
        return OrderStatus.processed;
    }
  }
}
