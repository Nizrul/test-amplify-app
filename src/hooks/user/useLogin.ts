import { useMutation } from '@tanstack/react-query';
import { useBoundStore } from '../common/useBoundStore';

interface LoginPayload {
  username: string,
  password: string,
}

export const useLogin = () => {
  const { login } = useBoundStore();
  return useMutation({
    mutationKey: ['userLogin'],
    mutationFn: async ({ username, password }: LoginPayload) => {
      console.log('passed username and password', { username, password });
      const token = 'someToken';
      login(token);
      return true;
    }
  });};