import { useQuery } from '@tanstack/react-query';
import { Office } from '../../types/properties';
import { v4 as uuid } from 'uuid';

export const useGetPropertyList = () => useQuery({
  queryKey: ['property'],
  queryFn: async () => {
    const test: Office[] = [
      {
        id: uuid(),
        name: 'Office 1',
        address: 'Test Address, Test Street, 10000, Test State',
        rooms: [
          {
            id: uuid(),
            name: 'Room 1',
            price: 6000,
            description: 'Some other information about the room'
          },
          {
            id: uuid(),
            name: 'Room 2',
            price: 7500,
            description: 'A different room but pricier'
          },
          {
            id: uuid(),
            name: 'Room 3',
            price: 17500,
            description: 'A different room but even pricier'
          }
        ]
      },
      {
        id: uuid(),
        name: 'Office 2',
        address: 'Some other address, somewhere else',
        rooms: [
          {
            id: uuid(),
            name: 'Room 1',
            price: 6000,
            description: 'Some other information about the room'
          },
          {
            id: uuid(),
            name: 'Room 2',
            price: 8000,
            description: 'A different room but pricier'
          }
        ]
      }
    ];
    await new Promise(r => setTimeout(r, 1000));

    return test;
  },
  enabled: true
});