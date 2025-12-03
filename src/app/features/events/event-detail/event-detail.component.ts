import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EventsService } from '../../../core/services/events.service';
import { EventDto } from '../../../models';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.scss'
})
export class EventDetailComponent implements OnInit {
  private readonly eventsService = inject(EventsService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  event = signal<EventDto | null>(null);
  isLoading = signal(true);
  eventId = signal<string>('');

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.eventId.set(id);
      this.loadEvent(id);
    } else {
      this.router.navigate(['/events']);
    }
  }

  loadEvent(id: string): void {
    this.isLoading.set(true);
    this.eventsService.getEvent(id).subscribe({
      next: (response) => {
        this.event.set(response);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        alert('Failed to load event details');
        this.router.navigate(['/events']);
      }
    });
  }

  deleteEvent(): void {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventsService.deleteEvent(this.eventId()).subscribe({
        next: () => {
          alert('Event deleted successfully');
          this.router.navigate(['/events']);
        },
        error: (error) => {
          alert('Failed to delete event: ' + (error.error?.title || 'Unknown error'));
        }
      });
    }
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  formatDateShort(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}
