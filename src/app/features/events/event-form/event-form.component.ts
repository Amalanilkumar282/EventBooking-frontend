import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventsService } from '../../../core/services/events.service';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.scss'
})
export class EventFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly eventsService = inject(EventsService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  eventForm: FormGroup;
  isLoading = signal(false);
  isEditMode = signal(false);
  eventId = signal<string | null>(null);
  errorMessage = signal<string | null>(null);
  validationErrors = signal<{ [key: string]: string[] } | null>(null);

  constructor() {
    this.eventForm = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
      venue: [''],
      startDate: ['', [Validators.required]],
      endDate: [''],
      capacity: [0, [Validators.required, Validators.min(1)]],
      isActive: [true]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.isEditMode.set(true);
      this.eventId.set(id);
      this.loadEvent(id);
    }
  }

  loadEvent(id: string): void {
    this.isLoading.set(true);
    this.eventsService.getEvent(id).subscribe({
      next: (event) => {
        this.eventForm.patchValue({
          name: event.name,
          description: event.description,
          venue: event.venue,
          startDate: this.formatDateForInput(event.startDate),
          endDate: event.endDate ? this.formatDateForInput(event.endDate) : '',
          capacity: event.capacity,
          isActive: event.isActive
        });
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        this.router.navigate(['/events']);
      }
    });
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set(null);
      this.validationErrors.set(null);

      const formValue = this.eventForm.value;
      const eventData = {
        ...formValue,
        startDate: new Date(formValue.startDate).toISOString(),
        endDate: formValue.endDate ? new Date(formValue.endDate).toISOString() : undefined
      };

      const request = this.isEditMode()
        ? this.eventsService.updateEvent(this.eventId()!, eventData)
        : this.eventsService.createEvent(eventData);

      request.subscribe({
        next: () => {
          this.isLoading.set(false);
          this.router.navigate(['/events']);
        },
        error: (error) => {
          this.isLoading.set(false);
          if (error.status === 400 && error.error?.errors) {
            this.validationErrors.set(error.error.errors);
          } else {
            this.errorMessage.set(error.error?.title || 'Operation failed. Please try again.');
          }
        }
      });
    } else {
      Object.keys(this.eventForm.controls).forEach(key => {
        const control = this.eventForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }

  getFieldError(fieldName: string): string {
    const control = this.eventForm.get(fieldName);
    
    const serverErrors = this.validationErrors();
    if (serverErrors && serverErrors[fieldName]) {
      return serverErrors[fieldName][0];
    }

    if (control?.touched && control?.errors) {
      if (control.errors['required']) return `${fieldName} is required`;
      if (control.errors['min']) return `${fieldName} must be at least ${control.errors['min'].min}`;
    }
    return '';
  }

  private formatDateForInput(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16);
  }
}
