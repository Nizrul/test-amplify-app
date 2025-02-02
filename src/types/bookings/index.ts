import { ObjectWithId } from '../common';
import { Room } from '../properties';

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  REJECTED = 'REJECTED',
}

export interface Booking extends ObjectWithId {
  customerId: string;
  roomId: string;
  totalPrice: number;
  bookingDateFrom: Date;
  bookingDateTo: Date;
  duration: number;
  status: BookingStatus;
  bookedDate: Date;
  room: Room;
}