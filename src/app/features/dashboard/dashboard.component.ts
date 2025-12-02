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
      this.eventsService.getEvents(1, 100).toPromise(),
      this.customersService.getCustomers(1, 100).toPromise(),
      this.bookingsService.getBookings(1, 100).toPromise()
    ]).then(([events, customers, bookings]) => {
      this.stats.set({
        totalEvents: events?.length || 0,
        totalCustomers: customers?.length || 0,
        totalBookings: bookings?.length || 0,
        activeEvents: events?.filter(e => e.isActive).length || 0
      });
      this.isLoading.set(false);
    }).catch(() => {
      this.isLoading.set(false);
    });
  }
}
