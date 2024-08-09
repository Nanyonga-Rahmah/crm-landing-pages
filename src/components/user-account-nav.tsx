'use client';

import { signOut } from 'next-auth/react';

import { Button } from './ui/button';

export const UserAccountNav = () => {
  return (
    <Button onClick={() => signOut({ callbackUrl: '/' })} variant="destructive">
      {' '}
      Sign Out
    </Button>
  );
};
