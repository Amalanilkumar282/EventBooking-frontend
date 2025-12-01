import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingsService } from '../../../core/services/bookings.service';
import { BookingDto } from '../../../models';

@Component({
  selector: 'app-bookings-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bookings-list.component.html',
  styleUrl: './bookings-list.component.scss'
})
export class BookingsListComponent implements OnInit {
  private readonly bookingsService = inject(BookingsService);

  bookings = signal<BookingDto[]>([]);
  isLoading = signal(true);
  currentPage = signal(1);
  pageSize = signal(20);
  totalItems = signal(0);

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.isLoading.set(true);
    this.bookingsService.getBookings(this.currentPage(), this.pageSize()).subscribe({
      next: (response) => {
        this.bookings.set(response.items);
        this.totalItems.set(response.total);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
    this.loadBookings();
  }

  deleteBooking(id: string): void {
    if (confirm('Are you sure you want to delete this booking?')) {
      this.bookingsService.deleteBooking(id).subscribe({
        next: () => {
          this.loadBookings();
        },
        error: (error) => {
          alert('Failed to delete booking: ' + (error.error?.title || 'Unknown error'));
        }
      });
    }
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems() / this.pageSize());
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
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
