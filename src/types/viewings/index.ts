import { ObjectWithId } from '../common';
import { Room } from '../properties';

export enum ViewingStatus {
  PENDING_ADMIN = 'PENDING_ADMIN',
  PENDING_CUSTOMER = 'PENDING_CUSTOMER',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  REJECTED = 'REJECTED',
}

export interface Viewing extends ObjectWithId {
  customerId: string;
  roomId: string;
  suggestedDate: Date;
  agreedDate?: Date;
  status: ViewingStatus;
  room: Room;
}