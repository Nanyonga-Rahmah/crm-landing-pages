import { useCallback } from 'react';
import { useRouter } from 'next/router';

export const useCustomRouter = () => {
  const router = useRouter();

  const navigateTo = useCallback(
    (path: string) => {
      router.push(path);
    },
    [router]
  );

  return { navigateTo };
};
