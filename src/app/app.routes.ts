import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { MainLayoutComponent } from './shared/layout/main-layout/main-layout.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { EventsListComponent } from './features/events/events-list/events-list.component';
import { EventFormComponent } from './features/events/event-form/event-form.component';
import { CustomersListComponent } from './features/customers/customers-list/customers-list.component';
import { BookingsListComponent } from './features/bookings/bookings-list/bookings-list.component';
import { TicketTypesListComponent } from './features/ticket-types/ticket-types-list/ticket-types-list.component';

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
      { path: 'events/:id', component: EventFormComponent },
      { path: 'customers', component: CustomersListComponent },
      { path: 'bookings', component: BookingsListComponent },
      { path: 'ticket-types', component: TicketTypesListComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];

