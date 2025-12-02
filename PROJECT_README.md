# EventBooking Frontend

A modern, professional event booking management system built with Angular 20+ following industry best practices and NX workspace standards.

## 🚀 Features

- **Authentication System**: Secure login and registration with JWT token management
- **Dashboard**: Overview statistics and quick actions
- **Events Management**: Full CRUD operations for events with search and pagination
- **Customers Management**: View and manage customer information
- **Bookings Management**: Handle event bookings with status tracking
- **Ticket Types Management**: Manage different ticket types for events
- **Responsive Design**: Professional UI that works on all devices
- **Type Safety**: Full TypeScript implementation with strict mode
- **Modern Architecture**: Standalone components, signals, and zoneless change detection

## 🏗️ Architecture

### Project Structure

```
src/
├── app/
│   ├── core/                      # Core functionality
│   │   ├── guards/                # Route guards
│   │   │   └── auth.guard.ts
│   │   ├── interceptors/          # HTTP interceptors
│   │   │   ├── auth.interceptor.ts
│   │   │   └── error.interceptor.ts
│   │   └── services/              # Core services
│   │       ├── auth.service.ts
│   │       ├── bookings.service.ts
│   │       ├── customers.service.ts
│   │       ├── events.service.ts
│   │       └── ticket-types.service.ts
│   ├── features/                  # Feature modules
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── bookings/
│   │   │   └── bookings-list/
│   │   ├── customers/
│   │   │   └── customers-list/
│   │   ├── dashboard/
│   │   ├── events/
│   │   │   ├── event-form/
│   │   │   └── events-list/
│   │   └── ticket-types/
│   │       └── ticket-types-list/
│   ├── models/                    # TypeScript interfaces
│   │   └── index.ts
│   ├── shared/                    # Shared components
│   │   └── layout/
│   │       ├── header/
│   │       ├── sidebar/
│   │       └── main-layout/
│   ├── app.config.ts              # Application configuration
│   ├── app.routes.ts              # Route definitions
│   └── app.ts                     # Root component
├── environments/                   # Environment configurations
│   ├── environment.ts
│   └── environment.development.ts
└── styles.scss                    # Global styles
```

### Architecture Principles

- **Standalone Components**: All components are standalone for better tree-shaking
- **Dependency Injection**: Modern Angular inject() function usage
- **Signals**: Reactive state management using Angular signals
- **Zoneless**: Optimized performance with zoneless change detection
- **Lazy Loading**: Routes are configured for optimal loading
- **Type Safety**: Strict TypeScript configuration with comprehensive types

## 🛠️ Technology Stack

- **Angular**: 20.3.0 (Latest)
- **TypeScript**: 5.9.2
- **RxJS**: 7.8.0
- **SCSS**: For styling with variables and mixins
- **Angular SSR**: Server-side rendering support

## 📋 Prerequisites

- Node.js (v18 or higher)
- Yarn package manager
- Angular CLI

## 🔧 Installation

1. Clone the repository
```bash
git clone <repository-url>
cd EventBooking-frontend
```

2. Install dependencies
```bash
yarn install
```

3. Configure environment
   - Update `src/environments/environment.development.ts` with your API URL
   - Update `src/environments/environment.ts` for production

## 🚀 Running the Application

### Development Server
```bash
yarn start
```
Navigate to `http://localhost:4200/`

### Production Build
```bash
yarn build
```
Build artifacts will be stored in the `dist/` directory

### Running Tests
```bash
yarn test
```

## 🔐 Environment Configuration

API endpoints are configured in environment files:

**Development** (`src/environments/environment.development.ts`):
```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:5001/api'
};
```

**Production** (`src/environments/environment.ts`):
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-production-api.com/api'
};
```

⚠️ **Important**: Environment files with sensitive data are git-ignored. Update these files with your actual API URLs.

## 🎨 Styling Guidelines

The application uses a professional color scheme:

- **Primary**: Purple gradient (#667eea to #764ba2)
- **Success**: Green (#48bb78)
- **Warning**: Orange (#ed8936)
- **Danger**: Red (#fc8181)
- **Neutral**: Gray scale (#f7fafc to #1a202c)

### SCSS Architecture
- Component-scoped styles
- Global utilities in `styles.scss`
- Consistent spacing and typography
- Responsive breakpoints: 768px, 1024px

## 🔒 Security Features

- JWT token-based authentication
- HTTP interceptor for automatic token attachment
- Auth guard for protected routes
- Automatic logout on 401 responses
- Secure token storage in localStorage
- Input validation on all forms

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🧩 Key Components

### Authentication
- Login with email/password
- User registration with validation
- Automatic redirection on auth state changes

### Dashboard
- Statistics overview (events, customers, bookings)
- Quick action cards
- Real-time data loading

### Events Management
- List view with search and pagination
- Create/Edit forms with validation
- Status indicators (Active/Inactive)
- Delete functionality with confirmation

### Customers Management
- Paginated customer list
- Avatar generation from initials
- Detailed customer information

### Bookings Management
- Booking list with status badges
- Pagination support
- Delete functionality

### Ticket Types Management
- Card-based display
- Price and quantity information
- Event association tracking

## 🔄 API Integration

All API calls are centralized in service files:
- `AuthService`: Login, register, logout
- `EventsService`: CRUD operations for events
- `CustomersService`: Customer management
- `BookingsService`: Booking operations
- `TicketTypesService`: Ticket type management

API endpoints are never hardcoded - all use environment configuration.

## 🎯 Best Practices Implemented

1. **Code Organization**: Feature-based structure
2. **Type Safety**: Comprehensive TypeScript interfaces
3. **Error Handling**: Global error interceptor
4. **Loading States**: User feedback during async operations
5. **Form Validation**: Client-side and server-side error display
6. **Accessibility**: Proper ARIA labels and keyboard navigation
7. **Performance**: Lazy loading, change detection optimization
8. **Security**: Token management, route guards
9. **Maintainability**: DRY principles, reusable components
10. **Standards**: Angular style guide compliance

## 📚 API Documentation

Full API documentation is available in `API_DOCUMENTATION.md`, including:
- Authentication endpoints
- Request/response formats
- Error handling
- Pagination
- Query parameters

## 🤝 Contributing

1. Follow Angular style guide
2. Use conventional commits
3. Write meaningful commit messages
4. Test all changes before committing
5. Keep components focused and small

## 📄 License

This project is private and proprietary.

## 👥 Team

Developed following modern Angular and industry best practices.

## 🐛 Known Issues

None at this time.

## 🔮 Future Enhancements

- Role-based access control
- Real-time notifications
- Advanced filtering and sorting
- Export functionality (PDF, Excel)
- Email notifications
- Payment integration
- Advanced analytics dashboard

## 📞 Support

For support, please contact the development team.
