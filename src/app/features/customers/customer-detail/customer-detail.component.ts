import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CustomersService } from '../../../core/services/customers.service';
import { CustomerDto } from '../../../models';

@Component({
  selector: 'app-customer-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.scss'
})
export class CustomerDetailComponent implements OnInit {
  private readonly customersService = inject(CustomersService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  customer = signal<CustomerDto | null>(null);
  isLoading = signal(true);
  customerId = signal<string>('');

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.customerId.set(id);
      this.loadCustomer(id);
    } else {
      this.router.navigate(['/customers']);
    }
  }

  loadCustomer(id: string): void {
    this.isLoading.set(true);
    this.customersService.getCustomer(id).subscribe({
      next: (response) => {
        this.customer.set(response);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        alert('Failed to load customer details');
        this.router.navigate(['/customers']);
      }
    });
  }

  deleteCustomer(): void {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customersService.deleteCustomer(this.customerId()).subscribe({
        next: () => {
          alert('Customer deleted successfully');
          this.router.navigate(['/customers']);
        },
        error: (error) => {
          alert('Failed to delete customer: ' + (error.error?.title || 'Unknown error'));
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
}
