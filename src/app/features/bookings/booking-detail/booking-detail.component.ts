import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BookingsService } from '../../../core/services/bookings.service';
import { BookingDto } from '../../../models';

@Component({
  selector: 'app-booking-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './booking-detail.component.html',
  styleUrl: './booking-detail.component.scss'
})
export class BookingDetailComponent implements OnInit {
  private readonly bookingsService = inject(BookingsService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  booking = signal<BookingDto | null>(null);
  isLoading = signal(true);
  bookingId = signal<string>('');

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bookingId.set(id);
      this.loadBooking(id);
    } else {
      this.router.navigate(['/bookings']);
    }
  }

  loadBooking(id: string): void {
    this.isLoading.set(true);
    this.bookingsService.getBooking(id).subscribe({
      next: (response) => {
        this.booking.set(response);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        alert('Failed to load booking details');
        this.router.navigate(['/bookings']);
      }
    });
  }

  deleteBooking(): void {
    if (confirm('Are you sure you want to delete this booking?')) {
      this.bookingsService.deleteBooking(this.bookingId()).subscribe({
        next: () => {
          alert('Booking deleted successfully');
          this.router.navigate(['/bookings']);
        },
        error: (error) => {
          alert('Failed to delete booking: ' + (error.error?.title || 'Unknown error'));
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

  getStatusClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      'Confirmed': 'confirmed',
      'Pending': 'pending',
      'Cancelled': 'cancelled'
    };
    return statusMap[status] || 'pending';
  }
}
