import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TicketTypesService } from '../../../core/services/ticket-types.service';
import { EventsService } from '../../../core/services/events.service';
import { TicketTypeDto } from '../../../models';

@Component({
  selector: 'app-ticket-type-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ticket-type-detail.component.html',
  styleUrl: './ticket-type-detail.component.scss'
})
export class TicketTypeDetailComponent implements OnInit {
  private readonly ticketTypesService = inject(TicketTypesService);
  private readonly eventsService = inject(EventsService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  ticketType = signal<TicketTypeDto | null>(null);
  isLoading = signal(true);
  ticketTypeId = signal<string>('');
  eventName = signal<string | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.ticketTypeId.set(id);
      this.loadTicketType(id);
    } else {
      this.router.navigate(['/ticket-types']);
    }
  }

  loadTicketType(id: string): void {
    this.isLoading.set(true);
    this.ticketTypesService.getTicketType(id).subscribe({
      next: (response) => {
        this.ticketType.set(response);
        this.loadEventName(response);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        alert('Failed to load ticket type details');
        this.router.navigate(['/ticket-types']);
      }
    });
  }

  private loadEventName(t: TicketTypeDto): void {
    if (t.eventId) {
      this.eventsService.getEvent(t.eventId).subscribe({
        next: (evt) => this.eventName.set(evt.name),
        error: () => this.eventName.set(null)
      });
    }
  }

  deleteTicketType(): void {
    if (confirm('Are you sure you want to delete this ticket type?')) {
      this.ticketTypesService.deleteTicketType(this.ticketTypeId()).subscribe({
        next: () => {
          alert('Ticket type deleted successfully');
          this.router.navigate(['/ticket-types']);
        },
        error: (error) => {
          alert('Failed to delete ticket type: ' + (error.error?.title || 'Unknown error'));
        }
      });
    }
  }

  get availableTickets(): number {
    const ticket = this.ticketType();
    return ticket ? ticket.quantity - ticket.sold : 0;
  }

  get soldPercentage(): number {
    const ticket = this.ticketType();
    return ticket && ticket.quantity > 0 ? (ticket.sold / ticket.quantity) * 100 : 0;
  }
}
