import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EventsService } from '../../core/services/events.service';
import { CustomersService } from '../../core/services/customers.service';
import { BookingsService } from '../../core/services/bookings.service';
import { AuthService } from '../../core/services/auth.service';

interface DashboardStats {
  totalEvents: number;
  totalCustomers: number;
  totalBookings: number;
  activeEvents: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  private readonly eventsService = inject(EventsService);
  private readonly customersService = inject(CustomersService);
  private readonly bookingsService = inject(BookingsService);
  private readonly authService = inject(AuthService);

  stats = signal<DashboardStats>({
    totalEvents: 0,
    totalCustomers: 0,
    totalBookings: 0,
    activeEvents: 0
  });

  currentUser = this.authService.currentUser$;
  isLoading = signal(true);

  ngOnInit(): void {
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    this.isLoading.set(true);

    Promise.all([
      this.eventsService.getEvents(1, 1).toPromise(),
      this.customersService.getCustomers(1, 1).toPromise(),
      this.bookingsService.getBookings(1, 1).toPromise()
    ]).then(([events, customers, bookings]) => {
      this.stats.set({
        totalEvents: events?.total || 0,
        totalCustomers: customers?.total || 0,
        totalBookings: bookings?.total || 0,
        activeEvents: events?.total || 0 // This would need a separate endpoint for accurate count
      });
      this.isLoading.set(false);
    }).catch(() => {
      this.isLoading.set(false);
    });
  }
}
