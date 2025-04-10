import { useQuery } from '@tanstack/react-query';
import { IState } from '../../app/shared/interfaces';

export const useStates = () => {
  return useQuery({
    queryKey: ['states'],
    queryFn: async () => {
      const response = await fetch('/api/states');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json() as Promise<IState[]>;
    },
  });
};
