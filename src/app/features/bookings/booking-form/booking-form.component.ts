import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BookingsService } from '../../../core/services/bookings.service';
import { EventsService } from '../../../core/services/events.service';
import { CustomersService } from '../../../core/services/customers.service';
import { TicketTypesService } from '../../../core/services/ticket-types.service';
import { BookingDto, CreateBookingDto, UpdateBookingDto, EventDto, CustomerDto, TicketTypeDto } from '../../../models';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.scss'
})
export class BookingFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly bookingsService = inject(BookingsService);
  private readonly eventsService = inject(EventsService);
  private readonly customersService = inject(CustomersService);
  private readonly ticketTypesService = inject(TicketTypesService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  form!: FormGroup;
  isLoading = signal(true);
  isSubmitting = signal(false);
  bookingId = signal<string | null>(null);
  events = signal<EventDto[]>([]);
  customers = signal<CustomerDto[]>([]);
  ticketTypes = signal<TicketTypeDto[]>([]);
  errorMessage = signal('');

  ngOnInit(): void {
    this.initForm();
    const id = this.route.snapshot.paramMap.get('id');
    this.loadLookups();

    if (id) {
      this.bookingId.set(id);
      this.loadBooking(id);
    } else {
      this.isLoading.set(false);
    }
  }

  initForm(): void {
    this.form = this.fb.group({
      eventId: ['', [Validators.required]],
      customerId: ['', [Validators.required]],
      ticketTypeId: ['', [Validators.required]],
      seats: [1, [Validators.required, Validators.min(1)]]
    });
  }

  loadLookups(): void {
    this.eventsService.getEvents(1, 100).subscribe({ next: (d) => this.events.set(d), error: () => {} });
    this.customersService.getCustomers(1, 100).subscribe({ next: (d) => this.customers.set(d), error: () => {} });
    this.ticketTypesService.getTicketTypes().subscribe({ next: (d) => this.ticketTypes.set(d), error: () => {} });
  }

  loadBooking(id: string): void {
    this.isLoading.set(true);
    this.bookingsService.getBooking(id).subscribe({
      next: (b) => {
        this.form.patchValue({
          eventId: b.eventId,
          customerId: b.customerId,
          ticketTypeId: b.ticketTypeId,
          seats: b.seats
        });
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('Failed to load booking');
        this.isLoading.set(false);
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set('');

    const id = this.bookingId();

    if (id) {
      const updateData: UpdateBookingDto = {
        seats: Number(this.form.value.seats),
        status: 'Confirmed'
      };
      this.bookingsService.updateBooking(id, updateData).subscribe({
        next: () => this.router.navigate(['/bookings', id]),
        error: (error) => {
          this.errorMessage.set(error.error?.title || 'Failed to update booking');
          this.isSubmitting.set(false);
        }
      });
    } else {
      const createData: CreateBookingDto = {
        eventId: this.form.value.eventId,
        customerId: this.form.value.customerId,
        ticketTypeId: this.form.value.ticketTypeId,
        seats: Number(this.form.value.seats)
      };

      this.bookingsService.createBooking(createData).subscribe({
        next: (created) => this.router.navigate(['/bookings', created.id]),
        error: (error) => {
          this.errorMessage.set(error.error?.title || 'Failed to create booking');
          this.isSubmitting.set(false);
        }
      });
    }
  }
}
