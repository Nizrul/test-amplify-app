import { StateCreator } from 'zustand';
import { Viewing } from '../../types/viewings';

export interface ViewingsSlice {
  viewings: Viewing[],
  getViewings: () => Viewing[],
  setViewings: (viewings: Viewing[] | undefined) => void,
  addViewing: (viewing: Viewing) => void,
  updateViewing: (viewingId: string, update: Partial<Viewing>) => void,
  deleteViewing: (viewingId: string) => void,
}

export const createViewingsSlice: StateCreator<
  ViewingsSlice,
  [],
  [],
  ViewingsSlice
> = (set, get) => ({
  viewings: [],
  getViewings: () => get().viewings,
  setViewings: (viewings) => set((state) => {
    state.viewings = viewings || [];
    return state;
  }),
  addViewing: (viewing) => set((state) => {
    if (!state.viewings) {
      state.viewings = [];
    }
    state.viewings.push(viewing);
    return state;
  }),
  updateViewing: (viewingId, update) => set((state) => {
    state.viewings = state.viewings.map(viewing => {
      if (viewing.id === viewingId) {
        return {
          ...viewing,
          ...update,
        };
      }
      return viewing;
    });

    return state;
  }),
  deleteViewing: (viewingId) => set((state) => {
    state.viewings = state.viewings.filter(viewing => viewing.id !== viewingId);
    return state;
  })
});