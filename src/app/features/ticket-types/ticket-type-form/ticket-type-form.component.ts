import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TicketTypesService } from '../../../core/services/ticket-types.service';
import { EventsService } from '../../../core/services/events.service';
import { TicketTypeDto, CreateTicketTypeDto, UpdateTicketTypeDto, EventDto } from '../../../models';

@Component({
  selector: 'app-ticket-type-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './ticket-type-form.component.html',
  styleUrl: './ticket-type-form.component.scss'
})
export class TicketTypeFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly ticketTypesService = inject(TicketTypesService);
  private readonly eventsService = inject(EventsService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  form!: FormGroup;
  isLoading = signal(true);
  isSubmitting = signal(false);
  ticketTypeId = signal<string | null>(null);
  events = signal<EventDto[]>([]);
  errorMessage = signal('');

  ngOnInit(): void {
    this.initForm();
    const id = this.route.snapshot.paramMap.get('id');
    this.loadEvents();

    if (id) {
      this.ticketTypeId.set(id);
      this.loadTicketType(id);
    } else {
      this.isLoading.set(false);
    }
  }

  initForm(): void {
    this.form = this.fb.group({
      eventId: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      quantity: [0, [Validators.required, Validators.min(1)]],
      isActive: [true]
    });
  }

  loadEvents(): void {
    this.eventsService.getEvents(1, 100).subscribe({
      next: (data) => this.events.set(data),
      error: () => {}
    });
  }

  loadTicketType(id: string): void {
    this.isLoading.set(true);
    this.ticketTypesService.getTicketType(id).subscribe({
      next: (ticket) => {
        this.form.patchValue({
          eventId: ticket.eventId,
          name: ticket.name,
          description: ticket.description,
          price: ticket.price,
          quantity: ticket.quantity,
          isActive: ticket.isActive
        });
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('Failed to load ticket type');
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

    const id = this.ticketTypeId();

    if (id) {
      const updateData: UpdateTicketTypeDto = {
        name: this.form.value.name,
        description: this.form.value.description,
        price: Number(this.form.value.price),
        quantity: Number(this.form.value.quantity),
        isActive: this.form.value.isActive
      };

      this.ticketTypesService.updateTicketType(id, updateData).subscribe({
        next: () => this.router.navigate(['/ticket-types', id]),
        error: (error) => {
          this.errorMessage.set(error.error?.title || 'Failed to update ticket type');
          this.isSubmitting.set(false);
        }
      });
    } else {
      const createData: CreateTicketTypeDto = {
        eventId: this.form.value.eventId,
        name: this.form.value.name,
        description: this.form.value.description,
        price: Number(this.form.value.price),
        quantity: Number(this.form.value.quantity)
      };

      this.ticketTypesService.createTicketType(createData).subscribe({
        next: (created) => this.router.navigate(['/ticket-types', created.id]),
        error: (error) => {
          this.errorMessage.set(error.error?.title || 'Failed to create ticket type');
          this.isSubmitting.set(false);
        }
      });
    }
  }
}
