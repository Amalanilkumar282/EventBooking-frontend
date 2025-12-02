import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CustomerDto, CreateCustomerDto, UpdateCustomerDto } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/customers`;

  getCustomers(page: number = 1, pageSize: number = 20): Observable<CustomerDto[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    
    return this.http.get<CustomerDto[]>(this.apiUrl, { params });
  }

  getCustomer(id: string): Observable<CustomerDto> {
    return this.http.get<CustomerDto>(`${this.apiUrl}/${id}`);
  }

  createCustomer(data: CreateCustomerDto): Observable<CustomerDto> {
    return this.http.post<CustomerDto>(this.apiUrl, data);
  }

  updateCustomer(id: string, data: UpdateCustomerDto): Observable<CustomerDto> {
    return this.http.put<CustomerDto>(`${this.apiUrl}/${id}`, data);
  }

  deleteCustomer(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
