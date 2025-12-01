import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BookingDto, CreateBookingDto, UpdateBookingDto, PagedResponse } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/bookings`;

  getBookings(page: number = 1, pageSize: number = 20): Observable<PagedResponse<BookingDto>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    
    return this.http.get<PagedResponse<BookingDto>>(this.apiUrl, { params });
  }

  getBooking(id: string): Observable<BookingDto> {
    return this.http.get<BookingDto>(`${this.apiUrl}/${id}`);
  }

  createBooking(data: CreateBookingDto): Observable<BookingDto> {
    return this.http.post<BookingDto>(this.apiUrl, data);
  }

  updateBooking(id: string, data: UpdateBookingDto): Observable<BookingDto> {
    return this.http.put<BookingDto>(`${this.apiUrl}/${id}`, data);
  }

  deleteBooking(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
