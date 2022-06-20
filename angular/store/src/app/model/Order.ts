import { OrderDetails } from './OrderDetails';
import { Address } from './Address';
import { Payment } from './Payment';

export class Order {
    order_id: number;
    order_date: string;
    shipment_date: string;
    shipping_address_id: number;
    payment_id: number
    order_status: string;
    auth_user_id: number;
    address: Address;
    order_details: OrderDetails[];
    payment: Payment;
  }