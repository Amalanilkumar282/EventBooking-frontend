import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TicketTypesService } from '../../../core/services/ticket-types.service';
import { TicketTypeDto } from '../../../models';

@Component({
  selector: 'app-ticket-types-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ticket-types-list.component.html',
  styleUrl: './ticket-types-list.component.scss'
})
export class TicketTypesListComponent implements OnInit {
  private readonly ticketTypesService = inject(TicketTypesService);

  ticketTypes = signal<TicketTypeDto[]>([]);
  isLoading = signal(true);

  ngOnInit(): void {
    this.loadTicketTypes();
  }

  loadTicketTypes(): void {
    this.isLoading.set(true);
    this.ticketTypesService.getTicketTypes().subscribe({
      next: (data) => {
        this.ticketTypes.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }

  deleteTicketType(id: string): void {
    if (confirm('Are you sure you want to delete this ticket type?')) {
      this.ticketTypesService.deleteTicketType(id).subscribe({
        next: () => {
          this.loadTicketTypes();
        },
        error: (error) => {
          alert('Failed to delete ticket type: ' + (error.error?.title || 'Unknown error'));
        }
      });
    }
  }
}
