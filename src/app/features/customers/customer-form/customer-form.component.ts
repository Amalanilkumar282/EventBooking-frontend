import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CustomersService } from '../../../core/services/customers.service';
import { CustomerDto, UpdateCustomerDto, CreateCustomerDto } from '../../../models';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss'
})
export class CustomerFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly customersService = inject(CustomersService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  customerForm!: FormGroup;
  isLoading = signal(true);
  isSubmitting = signal(false);
  customerId = signal<string | null>(null);
  errorMessage = signal<string>('');

  ngOnInit(): void {
    this.initForm();
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.customerId.set(id);
      this.loadCustomer(id);
    } else {
      this.isLoading.set(false);
    }
  }

  initForm(): void {
    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\+?[\d\s\-()]+$/)]],
      password: ['', [Validators.minLength(6)]]
    });
  }

  loadCustomer(id: string): void {
    this.isLoading.set(true);
    this.customersService.getCustomer(id).subscribe({
      next: (customer) => {
        this.customerForm.patchValue({
          firstName: customer.firstName,
          lastName: customer.lastName,
          email: customer.email,
          phoneNumber: customer.phoneNumber
        });
        this.isLoading.set(false);
      },
      error: (error) => {
        this.errorMessage.set('Failed to load customer');
        this.isLoading.set(false);
      }
    });
  }

  onSubmit(): void {
    if (this.customerForm.invalid) {
      this.customerForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set('');
    const id = this.customerId();

    if (id) {
      const updateData: UpdateCustomerDto = this.customerForm.value;
      this.customersService.updateCustomer(id, updateData).subscribe({
        next: () => {
          this.router.navigate(['/customers', id]);
        },
        error: (error) => {
          this.errorMessage.set(error.error?.title || 'Failed to update customer');
          this.isSubmitting.set(false);
        }
      });
    } else {
      const password = this.customerForm.get('password')?.value;
      if (!password || password.length < 6) {
        this.errorMessage.set('Password is required and must be at least 6 characters');
        this.isSubmitting.set(false);
        return;
      }

      const createData: CreateCustomerDto = {
        firstName: this.customerForm.value.firstName,
        lastName: this.customerForm.value.lastName,
        email: this.customerForm.value.email,
        phoneNumber: this.customerForm.value.phoneNumber,
        password
      };

      this.customersService.createCustomer(createData).subscribe({
        next: (created) => {
          this.router.navigate(['/customers', created.id]);
        },
        error: (error) => {
          this.errorMessage.set(error.error?.title || 'Failed to create customer');
          this.isSubmitting.set(false);
        }
      });
    }
  }

  getFieldError(fieldName: string): string {
    const field = this.customerForm.get(fieldName);
    if (field?.hasError('required')) return `${fieldName} is required`;
    if (field?.hasError('minlength')) return `${fieldName} is too short`;
    if (field?.hasError('email')) return 'Invalid email format';
    if (field?.hasError('pattern')) return 'Invalid phone number format';
    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.customerForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }
}
