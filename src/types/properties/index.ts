import { ObjectWithId } from '../common';

export interface Room extends ObjectWithId {
  name: string;
  price: number;
  description: string;
}
  
export interface Office extends ObjectWithId {
  name: string;
  address: string;
  rooms: Room[];
}