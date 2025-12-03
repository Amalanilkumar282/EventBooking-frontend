import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { MainLayoutComponent } from './shared/layout/main-layout/main-layout.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { EventsListComponent } from './features/events/events-list/events-list.component';
import { EventFormComponent } from './features/events/event-form/event-form.component';
import { EventDetailComponent } from './features/events/event-detail/event-detail.component';
import { CustomersListComponent } from './features/customers/customers-list/customers-list.component';
import { CustomerDetailComponent } from './features/customers/customer-detail/customer-detail.component';
import { CustomerFormComponent } from './features/customers/customer-form/customer-form.component';
import { BookingsListComponent } from './features/bookings/bookings-list/bookings-list.component';
import { BookingDetailComponent } from './features/bookings/booking-detail/booking-detail.component';
import { TicketTypesListComponent } from './features/ticket-types/ticket-types-list/ticket-types-list.component';
import { TicketTypeDetailComponent } from './features/ticket-types/ticket-type-detail/ticket-type-detail.component';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'events', component: EventsListComponent },
      { path: 'events/new', component: EventFormComponent },
      { path: 'events/:id/edit', component: EventFormComponent },
      { path: 'events/:id', component: EventDetailComponent },
      { path: 'customers', component: CustomersListComponent },
      { path: 'customers/:id/edit', component: CustomerFormComponent },
      { path: 'customers/:id', component: CustomerDetailComponent },
      { path: 'bookings', component: BookingsListComponent },
      { path: 'bookings/:id', component: BookingDetailComponent },
      { path: 'ticket-types', component: TicketTypesListComponent },
      { path: 'ticket-types/:id', component: TicketTypeDetailComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];

