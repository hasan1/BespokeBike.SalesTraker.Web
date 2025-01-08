import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, Observable } from 'rxjs';
import { Customer, CustomerCreateDto, CustomerUpdateDto } from '../Model/Customer';
import { ApiResponse } from '../Model/ApiResponse';
import { environment } from '../../emvironments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private readonly apiUrl = `${environment.apiUrl}/Customer`;

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    return this.http.get<ApiResponse<Customer[]>>(this.apiUrl).pipe(
      map(response => response.data)
    );
  }

  getCustomer(id: number): Observable<Customer> {
    return this.http.get<ApiResponse<Customer>>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }

  addCustomer(customer: CustomerCreateDto): Observable<Customer> {
    return this.http.post<ApiResponse<Customer>>(this.apiUrl, customer).pipe(
      map(response => response.data)
    );
  }

  updateCustomer(customer: CustomerUpdateDto): Observable<Customer> {
    return this.http.put<ApiResponse<Customer>>(`${this.apiUrl}/${customer.customerId}`, customer).pipe(
      map(response => response.data)
    );
  }

  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }
}
