import { PaymentMethods } from '../enums/payment-methods.enum';
import { Invoice } from './invoice';
import { User } from './user';

export class Payment {
  id: number;
  client: User;
  date: Date;
  amount: number;
  payment_method: PaymentMethods;
  invoice: Invoice;
}
