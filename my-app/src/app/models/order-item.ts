import { Order } from './order';
import { Product } from './product';

export class OrderItem {
  id: number;
  unit_price: number;
  quantity: number;
  totalPrice: number;
  product: Product;
  order: Order;
  productId: number;
  orderId: number;
}
