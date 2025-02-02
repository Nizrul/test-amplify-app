import { StateCreator } from 'zustand';

export interface UserSlice {
  isLoggedIn: boolean,
  token: string,
  login: (token: string) => void,
}

export const createUserSlice: StateCreator<
  UserSlice,
  [],
  [],
  UserSlice
> = (set) => ({
  isLoggedIn: false,
  token: '',
  login: (token) => set((state) => {
    state.token = token;
    state.isLoggedIn = true;
    return state;
  })
});