import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../model/user';
import { Product } from '../model/Product';
import { Address } from '../model/Address';
import { Payment } from '../model/Payment';
import { Order } from '../model/Order';
import { OrderDetails } from '../model/OrderDetails';
import { Entry } from '../model/Entry';


@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  newEntry: Entry;

  constructor(private httpClient: HttpClient) {
  }


  setStatus(order: Order) {
    return this.httpClient.post<Order>('http://localhost:8080/order/setOrderStatus', order);
  }

  setAdminRights(user: User) {
    return this.httpClient.post<User>('http://localhost:8080/users/setAdminRights', user);
  }

  getAddress(id) {    
    return this.httpClient.get<Address>('http://localhost:8080/order/getShippingAddress/' + id);
  }


  getPaymentStatus(id) {    
    return this.httpClient.get<Payment>('http://localhost:8080/order/getPaymentStatus/' + id);
  }


  getAllOrders() {    
    return this.httpClient.get<Order[]>('http://localhost:8080/order/getAllOrders');
  }

  
  addAll(newAddress: Address, newProduct: OrderDetails[])
  {
    this.newEntry = new Entry();
    this.newEntry.address = newAddress;
    this.newEntry.orderDetails = newProduct;

    return this.httpClient.post<Entry>('http://localhost:8080/order/makeOrder', this.newEntry);
  }


  getOrders(id) {    
    return this.httpClient.get<Order[]>('http://localhost:8080/order/getOrderID/' + id);
  }


  getOrderDetails(id) {    
    return this.httpClient.get<OrderDetails[]>('http://localhost:8080/order/getOrderDetails/' + id);
  }

  getUsers() {    
    return this.httpClient.get<User[]>('http://localhost:8080/users/get');
  }

  
  getByEmail(email) {    
    return this.httpClient.get<User>('http://localhost:8080/users/userStatus/' + email)
  }


  addUser(newUser: User) {
    return this.httpClient.post<User>('http://localhost:8080/users/add', newUser);
  }

  registerUser(newUser: User) {
    return this.httpClient.post<User>('http://localhost:8080/users/register', newUser);
  }

  deleteUser(id) {
    return this.httpClient.delete<User>('http://localhost:8080/users/' + id);
  }

  getProducts() {
    return this.httpClient.get<Product[]>('http://localhost:8080/products/get');
  }

  getOneItem(id) {
    return this.httpClient.get<Product>('http://localhost:8080/products/item/' + id);
  }

  addUploadData(selectedFile) {
    return this.httpClient.post('http://localhost:8080/products/upload', selectedFile);
  }

  addProduct(newProduct) {
    return this.httpClient.post<Product>('http://localhost:8080/products/add', newProduct);
  }

  deleteProduct(id) {
    return this.httpClient.delete<Product>('http://localhost:8080/products/' + id);
  }

  updateProduct(updatedProduct: Product) {
    return this.httpClient.put<Product>('http://localhost:8080/products/update', updatedProduct);
  }



}
