import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TicketTypeDto, CreateTicketTypeDto, UpdateTicketTypeDto } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class TicketTypesService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/tickettypes`;

  getTicketTypes(): Observable<TicketTypeDto[]> {
    return this.http.get<TicketTypeDto[]>(this.apiUrl);
  }

  getTicketType(id: string): Observable<TicketTypeDto> {
    return this.http.get<TicketTypeDto>(`${this.apiUrl}/${id}`);
  }

  createTicketType(data: CreateTicketTypeDto): Observable<TicketTypeDto> {
    return this.http.post<TicketTypeDto>(this.apiUrl, data);
  }

  updateTicketType(id: string, data: UpdateTicketTypeDto): Observable<TicketTypeDto> {
    return this.http.put<TicketTypeDto>(`${this.apiUrl}/${id}`, data);
  }

  deleteTicketType(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
