// Authentication Models
export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface LoginResponseDto {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  customer: CustomerDto;
}

// Customer Models
export interface CustomerDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
}

export interface CreateCustomerDto {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface UpdateCustomerDto {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

// Event Models
export interface EventDto {
  id: string;
  name: string;
  description: string;
  venue: string;
  startDate: string;
  endDate: string;
  capacity: number;
  isActive: boolean;
  createdAt: string;
}

export interface CreateEventDto {
  name: string;
  description: string;
  venue: string;
  startDate: string;
  endDate: string;
  capacity: number;
}

export interface UpdateEventDto {
  name: string;
  description: string;
  venue: string;
  startDate: string;
  endDate: string;
  capacity: number;
  isActive: boolean;
}

// Ticket Type Models
export interface TicketTypeDto {
  id: string;
  eventId: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  sold: number;
  isActive: boolean;
}

export interface CreateTicketTypeDto {
  eventId: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export interface UpdateTicketTypeDto {
  name: string;
  description: string;
  price: number;
  quantity: number;
  isActive: boolean;
}

// Booking Models
export interface BookingDto {
  id: string;
  eventId: string;
  customerId: string;
  ticketTypeId: string;
  seats: number;
  totalPrice: number;
  status: string;
  createdAt: string;
}

export interface CreateBookingDto {
  eventId: string;
  customerId: string;
  ticketTypeId: string;
  seats: number;
}

export interface UpdateBookingDto {
  seats: number;
  status: string;
}

// Error Models
export interface ApiError {
  type: string;
  title: string;
  status: number;
  errors?: { [key: string]: string[] };
}
