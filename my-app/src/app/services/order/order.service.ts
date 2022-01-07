import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/order';
import { ErrorHandler } from 'src/app/shared/error-handler';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orderUrl = `http://localhost:3000/orders`;
  constructor(private http: HttpClient) {}
  private errorHandler: ErrorHandler = new ErrorHandler();

  // For admin staff
  getOrders(): Observable<Order[]> {
    try {
      return this.http.get<Order[]>(this.orderUrl);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  // For user staff
  getUserOrders(orderId: number): Observable<Order> {
    try {
      return this.http.get<Order>(`${this.orderUrl}/${orderId}`);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }
}
