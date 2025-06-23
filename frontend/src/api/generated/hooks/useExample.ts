import { useQuery } from '@tanstack/react-query';
import { client } from '../client';
import type { ExampleSchema } from '../schemas';

export const useExample = () =>
  useQuery(['example'], async () => {
    const { data } = await client.get<ExampleSchema>('/example');
    return data;
  });
